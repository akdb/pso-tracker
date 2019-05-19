import Model from './Model';

/** @typedef {import('./PaletteProfiles').TrackerLayout} TrackerLayout */
/** @typedef {import('./Trackables').TrackableReference} TrackableReference */

/**
 * Represents an instance of user input that interacts with {@link Model}s or interests {@link Palettes}
 * @typedef {Object} InputEvent
 * @property {TrackableReference} trackKey - Trackable that was interacted with due to the input event, or null
 */

/**
 * Creates key up/down events on the window to interact with a {@link Model}.
 */
export default class KeyController {

    /**
     * @param {Model} model - Data model to affect
     */
    constructor(model) {
        if (!(model instanceof Model))
            throw new TypeError('Expected a Model object for the model parameter');
        this.model = model;

        this._inputLevel = 0;
        this._inputFactor = 1;
        this._inputLevelOverride = {};
        this._codeToTrackableMap = {};
        this._trackableToCodeMap = {};
        this._inputHandlers = [];

        window.addEventListener('keydown', event => this.OnKeyDown(event));
        window.addEventListener('keyup', event => this.OnKeyUp(event));
    }

    /**
     * Multiplier for affecting the model. Affected by Shift key.
     * @readonly
     * @return {number} 1 or -1
     */
    get InputFactor() {
        return this._inputFactor;
    }

    /**
     * The highest increment level that will be used when affecting the model.
     * Affected by Ctrl and Alt keys.
     * @readonly
     * @return {number} Between 0 and 3 inclusive
     */
    get InputLevel() {
        return this._inputLevel;
    }

    /**
     * Set keybindings.
     * @param {TrackerLayout} layout - Layout containing keybinding data to use
     */
    Initialize(layout) {
        this._codeToTrackableMap = {};
        this._trackableToCodeMap = {};
        for (const [trackKey, { code }] of Object.entries(layout)) {
            this._codeToTrackableMap[code] = trackKey;
            this._trackableToCodeMap[trackKey] = code;
        }
    }

    /**
     * Returns the increment level that will be used if a trackable's key is pressed.
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @return {number} {@link InputLevel} unless an override is defined by {@link OverrideInputLevel}
     */
    GetInputLevel(trackKey) {
        if (trackKey in this._inputLevelOverride && this._inputLevelOverride[trackKey] !== null) {
            return this._inputLevelOverride[trackKey];
        }
        var increments = this.model.GetAttribute(trackKey, 'increment', [1]);
        if (this._inputLevel >= increments.length)
            return increments.length - 1;
        return this._inputLevel;
    }

    /**
     * Affect the model when a relevant key is pressed, and also track modifier keys that will change how the model is affected.
     * @see {KeyController.InputFactor}
     * @see {KeyController.InputLevel}
     * @param {KeyboardEvent} event - Key press data
     * @return {undefined}
     */
    OnKeyDown(event) {
        if (this._codeToTrackableMap === null)
            return;

        this._inputLevel = 0;
        if (event.altKey)
            ++this._inputLevel;
        if (event.ctrlKey)
            this._inputLevel += 2;
        this._inputFactor = event.shiftKey ? -1 : 1;

        let fireEvent = false;
        let affectedTrackKey = null;

        if (event.code.startsWith('Alt') || event.code.startsWith('Control') || event.shiftKey) {
            fireEvent = true;
        }

        if (event.code in this._codeToTrackableMap) {
            fireEvent = true;
            affectedTrackKey = this._codeToTrackableMap[event.code];
            this.model.IncrementValue(affectedTrackKey, this.GetInputLevel(affectedTrackKey), event.shiftKey ? -1 : 1);
        }

        if (fireEvent) {
            for (const handler of this._inputHandlers) {
                handler({ trackKey: affectedTrackKey });
            }
            event.preventDefault();
        }
    }

    /**
     * Reset state from modifier keys.
     * @see InputFactor
     * @see InputLevel
     * @param {KeyboardEvent} event - Key press data
     * @return {undefined}
     */
    OnKeyUp(event) {
        if (this._codeToTrackableMap === null)
            return;

        let shift = event.code.startsWith('Shift');
        if (!shift && !event.code.startsWith('Alt') && !event.code.startsWith('Control'))
            return;
        if (shift)
            this._inputFactor = 1;
        this._inputLevel = 0;

        for (const handler of this._inputHandlers) {
            handler({ trackKey: null });
        }
    }

    /**
     * Register a callback to fire when a key is pressed, generating {@link InputEvent} data.
     * @param {function({InputEvent})} handler - Event handler
     * @return {function({InputEvent})} Returns the parameter
     */
    RegisterInputHandler(handler) {
        if (typeof handler !== 'function')
            throw new TypeError('Expected a function as the parameter');
        this._inputHandlers.push(handler);
        return handler;
    }

    /**
     * Unregister an event handler originally passed to {@link RegisterInputHandler}
     * @param {function({InputEvent})} handler - Event handler
     */
    UnregisterInputHandler(handler) {
        let index = Array.indexOf(handler);
        if (index > -1) {
            this._inputHandlers.splice(index, 1);
        }
    }

    /**
     * Force a different level than what key modifiers would usually prescribe for a given trackable.
     * @param {string} trackKey - Trackable key that this override applies to
     * @param {number} level - Increment level to use when the key is pressed, or null to release an override.
     */
    OverrideInputLevel(trackKey, level) {
        this._inputLevelOverride[trackKey] = level;
    }

    /**
     * Returns the mapped key for a trackable.
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @return {string} - Key code expected for the trackable
     */
    GetKeyCode(trackKey) {
        return this._trackableToCodeMap[trackKey];
    }

    /**
     * Returns a string to display to the user to convey what key is used to control a trackable.
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @param {number} [incrementLevel] - Show the key combination for the trackable at the specified level (default first level)
     * @return {string} - Display text for the key combination for the trackable, or empty string if no control is available for the specified combination
     */
    GetKeyCodeDisplayText(trackKey, incrementLevel = 0) {
        if (incrementLevel < 0 || incrementLevel > 3)
            return '';

        let text = this.GetKeyCode(trackKey);
        if (!text)
            return '';

        // this does not work with non-QWERTY keyboard layouts, but there doesn't seem to be any certain way to get the user's keyboard layout
        if (text.startsWith('Key'))
            text = text.substr(3); // eslint-disable-line no-magic-numbers
        else if (text.startsWith('Digit'))
            text = text.substr(5); // eslint-disable-line no-magic-numbers

        if (incrementLevel & 2)
            text = 'Ctrl+' + text;
        if (incrementLevel & 1)
            text = 'Alt+' + text;

        return text;
    }

    /**
     * Returns a string to display to the user to convey what controls are available to control a trackable (all increment levels).
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @return {string} - Display text for the trackable, or empty string if no control is available for the specified trackable
     */
    GetAllIncrementsDisplayText(trackKey) {
        if (this.model.GetAttribute(trackKey, 'toggle')) {
            let key = this.GetKeyCodeDisplayText(trackKey);
            return `On:[${key}] Off:[Shift+${key}]`;
        }

        var increments = this.model.GetAttribute(trackKey, 'increment', [1]);
        let text = '';

        for (let level in increments) {
            if (level > 0)
                text += ", ";
            text += `+${increments[level]}:[` + this.GetKeyCodeDisplayText(trackKey, level) + ']';
        }
        if (text)
            text += ' (Shift to subtract)';
        return text;
    }
}

