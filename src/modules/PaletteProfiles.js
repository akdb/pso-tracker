import Trackables from './Trackables';

/* eslint-disable no-magic-numbers*/


/**
 * Reference to a profile in {@link PaletteProfiles}.
 * @typedef {string} ProfileKey
 */

/**
* An assortment of trackables to show on a palette with position and keybinding information.
* @typedef {Object.<TrackableKey, LayoutEntry>} TrackerLayout
*/

/**
 * Maps a trackable to grid coordinates and a keybinding.
 * @typedef {Object} LayoutEntry
 * @property {numeric} x - X coordinate on the grid layout
 * @property {numeric} y - Y coordinate on the grid layout
 * @property {string} code - See {@link KeyboardEvent.code}
 */

/**
 * Defines a collection of trackables available with extra parameters.
 * @typedef {Object} PaletteProfile
 * @property {string} name - Display name of the profile
 * @property {Object.<TrackableKey, TrackableData>} trackables - Defines available trackables for the profile with extension attributes
 * @property {TrackerLayout} layouts - Preset layouts available for the profile.
 */

/**
 * @type {Object.<string, TrackableData>}
 */
let PaletteProfiles = {
    'ep1-glitchless-any%-fonewm': {
        'name': 'Episode 1 Glitchless Any% FOnewm',
        'trackables': {
            'foie': { 'min': 1 },
            'barta': {
                'target': 1,
                'initial': 1,
            },
            'zonde': { 'target': 1 },
            'gifoie': {
                'target': 1,
                'targetUnless': ['rafoie']
            },
            'gibarta': {},
            'gizonde': {
                'target': 1,
                'targetUnless': ['razonde']
            },
            'rafoie': {},
            'rabarta': {},
            'razonde': {},
            'hp': { 'target': 21 },
            'mst': {},
            'slots': {
                'target': 2,
                'targetUnless': ['hp'],
            },
            'barrier': {}
        },
        'layouts': [
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 3, y: 2, code: 'KeyF' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 2, y: 3, code: 'KeyC' },
            },
            {
                'zonde': { x: 0, y: 1, code: 'Digit1' },
                'barta': { x: 1, y: 0, code: 'Digit2' },
                'foie': { x: 2, y: 0, code: 'Digit3' },
                'gizonde': { x: 0, y: 2, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'gifoie': { x: 2, y: 1, code: 'KeyE' },
                'razonde': { x: 0, y: 3, code: 'KeyA' },
                'rabarta': { x: 1, y: 2, code: 'KeyS' },
                'rafoie': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 0, y: 4, code: 'KeyZ' },
                'slots': { x: 1, y: 3, code: 'KeyX' },
                'barrier': { x: 2, y: 3, code: 'KeyC' },
                'mst': { x: 3, y: 2, code: 'KeyV' },
            },
        ]
    },
    'ep1-glitchless-any%-fonewearl': {
        'name': "Episode 1 Glitchless Any% FOnewearl",
        'trackables': {
            'foie': { 'min': 1 },
            'barta': {
                'target': 1,
                'initial': 1,
            },
            'zonde': { 'target': 1 },
            'gifoie': {
                'target': 1,
                'targetUnless': ['rafoie']
            },
            'gibarta': {},
            'gizonde': {
                'target': 1,
                'targetUnless': ['razonde']
            },
            'rafoie': {},
            'rabarta': {},
            'razonde': {},
            'hp': { 'target': 39 },
            'mst': {},
            'slots': {
                'target': 4,
                'targetUnless': ['hp'],
            },
            'barrier': { 'target': 1 }
        },
        'layouts': [
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 3, y: 2, code: 'KeyF' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 2, y: 3, code: 'KeyC' },
            },
            {
                'zonde': { x: 0, y: 1, code: 'Digit1' },
                'barta': { x: 1, y: 0, code: 'Digit2' },
                'foie': { x: 2, y: 0, code: 'Digit3' },
                'gizonde': { x: 0, y: 2, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'gifoie': { x: 2, y: 1, code: 'KeyE' },
                'razonde': { x: 0, y: 3, code: 'KeyA' },
                'rabarta': { x: 1, y: 2, code: 'KeyS' },
                'rafoie': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 0, y: 4, code: 'KeyZ' },
                'slots': { x: 1, y: 3, code: 'KeyX' },
                'barrier': { x: 2, y: 3, code: 'KeyC' },
                'mst': { x: 3, y: 2, code: 'KeyV' },
            },
        ]
    }

};

for (let [key, profileData] of Object.entries(PaletteProfiles)) {

    profileData.key = key;
    for (let [trackKey, trackData] of Object.entries(profileData.trackables)) {
        if (!Trackables[trackKey])
            throw new Error("Profile referenced an item undefined in Trackables");

        if (trackData.targetUnless) {
            for (const linkItem of trackData.targetUnless) {
                (profileData.trackables[linkItem].link = profileData.trackables[linkItem].link || []).push(trackKey);
            }
        }

        for (const [property, parentData] of Object.entries(Trackables[trackKey])) {
            if (!(property in trackData))
                trackData[property] = parentData;
        }
    }

    for (const layout of Object.values(profileData.layouts)) {
        for (const trackKey of Object.keys(layout)) {
            if (!profileData.trackables[trackKey])
                throw new Error(`Profile layout referenced an item undefined in its imported trackables: ${trackKey}`);
        }
    }

}

export default PaletteProfiles;
