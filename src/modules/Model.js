/** @typedef {import('./PaletteProfiles').TrackerLayout} TrackerLayout */
/** @typedef {import('./Trackables').TrackableReference} TrackableReference */
/** @typedef {import('./Trackables').TrackableData} TrackableData */

/**
 * Represents an instance of a value being set in a {@link Model}. Can represent a "no change" event.
 * @typedef {Object} ChangeEvent
 * @property {TrackableReference} trackKey - Trackable that is being modified
 * @property {number} previousValue - The value before the event
 * @property {number} value - The new value being set
 */

/**
 * Contains data on the tracker including current values for each trackable and handles value changes.
 */
export default class Model {

    /**
     * Instantiate the model.
     */
    constructor() {
        this._data = {};
        this._changeHandlers = [];
        this._proxyHandler = {
            ownKeys: () => Object.keys(this._values),
            getOwnPropertyDescriptor: () => { return { configurable: true, enumerable: true }; },
            has: (obj, prop) => prop in this._values,
            get: (obj, prop) => this._values[prop],
            set: (obj, prop, value) => this.SetValue(prop, value)
        };

        //initialize this._valuesProxy
        this.values = {};
    }

    /**
     * Register a callback to fire when a value is changed, generating {@link ChangeEvent} data.
     * @param {function({ChangeEvent})} handler - Event handler
     * @return {function({ChangeEvent})} Returns the parameter
     */
    RegisterChangeHandler(handler) {
        if (typeof handler !== 'function')
            throw new TypeError('Expected a function as the parameter');
        this._changeHandlers.push(handler);
        return handler;
    }

    /**
     * Unregister an event handler originally passed to {@link RegisterChangeHandler}
     * @param {function({ChangeEvent})} handler - Event handler
     */
    UnregisterChangeHandler(handler) {
        let index = Array.indexOf(handler);
        if (index > -1) {
            this._changeHandlers.splice(index, 1);
        }
    }

    /**
     * Get value data for all items in the tracker.
     * @return {Object.<TrackableReference, number>} Values container with trackable references as keys
     */
    get values() {
        return this._valuesProxy;
    }

    /**
     * Set value data for all items in the tracker.
     * @param {Object.<TrackableReference, number>} data - Values container with trackable references as keys. All keys must map to trackables in the model.
     */
    set values(data) {
        if (Object.keys(data).some(key => !(key in this.trackables)))
            throw new RangeError("Values data included a key that is not defined in the Model's trackables");
        this._values = data;
        this._valuesProxy = new Proxy(this._values, this._proxyHandler);
    }

    /**
     * Property data for all items in the tracker.
     * @return {Object.<TrackableReference, TrackableData>} Attributes container with trackble references as keys
     */
    get trackables() {
        return this._data;
    }

    /**
     * Set property data and trackable items for the tracker. Resets all values.
     * @param {Object.<TrackableReference, TrackableData>} data - Attributes container with trackble references as keys
     */
    set trackables(data) {
        if (typeof data !== 'object')
            throw new TypeError("Expected an object for 'data'");
        this._data = data;
        this.ResetValues();
    }

    /**
     * Set a value in the tracker.
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @param {number} value - New value
     */
    SetValue(trackKey, value) {
        if (!(trackKey in this.values))
            throw new RangeError(`Trackable '${trackKey}' is not an available value`);

        let old = this._values[trackKey];
        this._values[trackKey] = value;

        for (const handler of this._changeHandlers) {
            handler({
                trackKey: trackKey,
                previousValue: old,
                value: value
            });
        }

        if (old != value)
            this.GetAttribute(trackKey, 'link', []).forEach(linkedTrackable => this.BumpValue(linkedTrackable, 0));
        return true;
    }

    /**
     * Reset all values on the tracker to their initial values.
     */
    ResetValues() {
        this._values = {};
        for (const trackKey of Object.keys(this.trackables)) {
            let initialValue = this.GetAttribute(trackKey, 'min', 0);

            // populate this key as a valid key
            this._values[trackKey] = initialValue;
            // fire callbacks (using same value to stop linked bumps, because every property is being bumped already)
            this.SetValue(trackKey, initialValue);
        }
    }

    /**
     * Get attribute data for a trackable with a fallback default.
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @param {string} attribute - Property name from {@link TrackableData}
     * @param {*} def - Default value
     * @return {*} Attribute data if defined, else the default value
     */
    GetAttribute(trackKey, attribute, def) {
        if (!(trackKey in this._data))
            throw new RangeError(`Trackable '${trackKey}' is not used in the model`);

        if (attribute in this._data[trackKey])
            return this._data[trackKey][attribute];
        return def;
    }

    /**
     * Get data on whether a goal value has been met for a trackable (or if related trackables had their goals met)
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @return {{value:number, fulfilled: boolean}} - The target value for the trackable if any, and whether the target has been met (0 values are always count as not met)
     */
    GetTarget(trackKey) {
        let target = this.GetAttribute(trackKey, 'target');
        let unless = this.GetAttribute(trackKey, "targetUnless", []);
        let alternateFulfilled = false;
        if (unless.length && unless.every(unlessTrackable => this.GetTarget(unlessTrackable).fulfilled))
            alternateFulfilled = true;

        if (target === void 0)
            return { fulfilled: alternateFulfilled || this._values[trackKey] >= 1 };
        return {
            value: target,
            fulfilled: alternateFulfilled || this._values[trackKey] >= target
        };
    }

    /**
     * Add or subtract to a value in the model
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @param {number} amount - Amount to change the value by (will be clamped by min and max attributes)
     */
    BumpValue(trackKey, amount) {
        if (!(trackKey in this.trackables))
            throw new RangeError(`Trackable '${trackKey}' is not used in the model`);
        let newValue = this.values[trackKey] + amount;

        var toggle = this.GetAttribute(trackKey, "toggle");
        if (amount > 0) {
            var max = toggle ? 1 : this.GetAttribute(trackKey, 'max');
            if (max !== void 0 && newValue > max)
                newValue = max;
        } else {
            var min = toggle ? 0 : this.GetAttribute(trackKey, 'min', 0);
            if (min !== null && newValue < min)
                newValue = min;
        }
        this.values[trackKey] = newValue;
    }

    /**
     * Add or subtract to a value in the model based on the 'increment' sett
     * @param {TrackableReference} trackKey - Reference to a trackable
     * @param {number} level - Increment level corresponding to the index of the increment attribute for the trackable
     * @param {number} factor - Multiplier (e.g. -1 to subtract instead of add)
     */
    IncrementValue(trackKey, level, factor = 1) {
        if (!(trackKey in this.trackables))
            throw new RangeError(`Trackable '${trackKey}' is not used in the model`);

        var increment = this.GetAttribute(trackKey, 'increment', [1]);
        var amount = increment[Math.min(level, increment.length - 1)];
        this.BumpValue(trackKey, amount * factor);
    }

}