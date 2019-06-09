import Model from './modules/Model';
import Palette from './modules/Palette';
import PaletteProfiles from './modules/PaletteProfiles';
import KeyController from './modules/KeyController';
import SaveData from './modules/SaveData';

/** @typedef {import('./modules/Palette').PaletteOptions} PaletteOptions */
/** @typedef {import('./modules/PaletteProfiles').ProfileKey} ProfileKey */

/**
 * Parameters for the tracker interface and model.
 * @typedef {Object} TrackerConfiguration
 * @property {string} profile - Key of the profile to use
 * @property {string} view - View type identifier
 * @property {number} [windowWidth] - X Size to use for the tracker window
 * @property {number} [windowHeight] - Y size to use for the tracker window
 * @property {string} [background] - Background to apply to the window
 */

/**
 * @type {SaveData}
 */
var saveContainer = new SaveData(localStorage);

/**
 * Margin between palettes when using a separate input palette.
 */
const PALETTE_SPACING = 20;

/**
 * Margin applied to make sure the viewBox property is set appropriately to show all palettes without clipping.
 */
const VIEWBOX_PADDING = 5;

/**
 * Default tracker configuration when no save data or configuration is present.
 * @type {TrackerConfiguration}
 * @constant
 */
const DEFAULT_CONFIGURATION = {
    profile: 'ep1-glitchless-any%-fonewm',
    layout: 0,
};

/**
 * @type {PaletteProfile}
 */
var activeProfile;

/**
 * @type {Model}
 */
var model = new Model();


/**
 * Adjust the current window size.
 * @param {number} width - New width of the window
 * @param {number} height - New height of the window
 */
function SetWindowSize(width, height) {
    window.resizeTo(width, height);
    console.debug(`Recalled window size of ${width}x${height}`); // eslint-disable-line no-console
}

/**
 * Apply a configuration to the model.
 * @param {TrackerConfiguration} config - Configuration to apply
 */
function UseConfiguration(config) {
    activeProfile = PaletteProfiles[config.profile];
    model.trackables = activeProfile.trackables;
    if (saveContainer.data.values)
        model.values = saveContainer.data.values;
}

/**
 * Load saved data from local storage.
 * @param {ProfileKey} profile - apply saved data when the profile matches this profile
 * @return {boolean} Whether data was loaded successfully
 */
function Load(profile) {
    try {
        if (saveContainer.Load() && saveContainer.data) {
            console.debug('load', saveContainer.data); // eslint-disable-line no-console

            if (profile === saveContainer.data.configuration.profile) {
                UseConfiguration(saveContainer.data.configuration);
                return true;
            }
            saveContainer.data.values = null;
        }
    }
    catch (ex) {
        console.error(ex); // eslint-disable-line no-console
    }
    return false;
}

/**
 * Palette options used when hybrid mode is chosen.
 * @type {PaletteOptions}
 */
let hybridFeatures = {
    displayValue: true,
    outerEdge: true,
    cellControls: true,
    incrementControls: true,
    displayKey: true,
    cssClass: ['hybrid', 'view', 'input'],
};

/**
 * Palette options used when view-only-mouse mode is chosen.
 * @type {PaletteOptions}
 */
let mouseOnlyFeatures = {
    displayValue: true,
    outerEdge: true,
    cellControls: true,
    cssClass: ['view', 'input'],
};

/**
 * Palette options used when two-palette mode is chosen, on the first (input) palette.
 * @type {PaletteOptions}
 */
let inputFeatures = {
    iconScale: 2 / 3,
    cellControls: true,
    incrementControls: true,
    displayKey: true,
    cssClass: 'input',
};

/**
 * Palette options used when view-only-keys mode is chosen, or two-palette mode is chosen (for the second 'view' palette)
 * @type {PaletteOptions}
 */
let separateViewFeatures = {
    displayValue: true,
    outerEdge: true,
    cssClass: 'view'
};


/* execution */

window.onload = () => {

    let inputRoot = document.getElementById('input');
    let mainRoot = document.getElementById('main');
    let statusArea = document.getElementsByTagName('footer')[0];

    var params = new URLSearchParams(window.location.search);

    if (!Load(params.get('profile'))) {
        if (params.get('profile')) {
            let newConfig = {
                profile: params.get('profile'),
                layout: params.get('layout') || 0
            };
            UseConfiguration(newConfig);
            saveContainer.data.configuration = newConfig;
        }
        else {
            UseConfiguration(DEFAULT_CONFIGURATION);
        }
    }
    else {
        saveContainer.data.configuration.layout = params.get('layout');
    }

    saveContainer.data.configuration.background = params.get('background');
    saveContainer.data.configuration.view = params.get('view');

    let keyController = null;
    if (params.get('view') != 'view-only-mouse') {
        keyController = new KeyController(model);
        keyController.Initialize(activeProfile.layouts[saveContainer.data.configuration.layout]);
    }

    let paletteFeatures = [null, null];
    let paletteContainers = [inputRoot, mainRoot];

    switch (params.get('view')) {
        case 'hybrid':
            paletteFeatures[0] = hybridFeatures;
            break;
        case 'view-only-mouse':
            paletteFeatures[0] = mouseOnlyFeatures;
            break;
        case 'view-only-keys':
            paletteFeatures[0] = separateViewFeatures;
            break;
        case 'two-palettes':
            paletteFeatures[0] = inputFeatures;
            paletteFeatures[1] = separateViewFeatures;
            break;
    }

    let bounds = { x: 0, y: 0 };
    for (let paletteID in paletteFeatures) {
        if (paletteFeatures[paletteID] === null)
            break;
        if (paletteID > 0)
            bounds.x += PALETTE_SPACING;
        let palette = new Palette(model, paletteContainers[paletteID], statusArea, keyController, paletteFeatures[paletteID]);
        palette.Render(activeProfile.layouts[saveContainer.data.configuration.layout], bounds.x, 0);
        let newBounds = palette.GetBounds();
        bounds.x += newBounds.x2;
        bounds.y = newBounds.y2;
    }

    model.RegisterChangeHandler(() => {
        saveContainer.data.values = model.values;
        saveContainer.Save();
    });


    document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0 0 ' + (bounds.x + VIEWBOX_PADDING) + ' ' + (bounds.y + VIEWBOX_PADDING));

    // Set page controls

    if (params.get('background'))
        document.getElementsByTagName('body')[0].style.background = params.get('background');

    document.getElementById('reset').onclick = () => {
        model.ResetValues();
    };

    document.getElementById('saveWindowSize').onclick = () => {
        saveContainer.data.configuration.windowWidth = window.outerWidth;
        saveContainer.data.configuration.windowHeight = window.outerHeight;
        saveContainer.data.configuration.windowWidthMargin = window.outerWidth - window.innerWidth;
        saveContainer.data.configuration.windowHeightMargin = window.outerHeight - window.innerHeight;
        saveContainer.Save();
    };

    document.getElementById('revertWindowSize').onclick = () => {
        if (saveContainer.data.configuration.windowWidth && saveContainer.data.configuration.windowHeight) {
            SetWindowSize(saveContainer.data.configuration.windowWidth, saveContainer.data.configuration.windowHeight);
        }
    };
};
