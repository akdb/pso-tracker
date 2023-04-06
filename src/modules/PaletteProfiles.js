/** @module PaletteProfiles */

import Trackables from './Trackables';

/* eslint-disable no-magic-numbers*/

/** @typedef {module:Trackables.TrackableReference} TrackableKey */
/** @typedef {module:Trackables.TrackableData} TrackableData */

/**
 * Reference to a profile in {@link PaletteProfiles}.
 * @typedef {string} ProfileKey
 */

/**
 * An assortment of trackables to show on a palette with position and keybinding information.
 * @typedef {Object<TrackableKey, LayoutEntry>} TrackerLayout
 */

/**
 * Maps a trackable to grid coordinates and a keybinding.
 * @typedef {object} LayoutEntry
 * @property {number} x - X coordinate on the grid layout
 * @property {number} y - Y coordinate on the grid layout
 * @property {string} code - See {@link KeyboardEvent.code}
 */

/**
 * Defines a collection of trackables available with extra parameters.
 * @typedef {object} PaletteProfile
 * @property {string} name - Display name of the profile
 * @property {Object<TrackableKey, TrackableData>} trackables - Defines available trackables for the profile with extension attributes
 * @property {TrackableKey} layouts - Preset layouts available for the profile.
 */

/**
 * @type {Object<string, TrackableData>}
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
            'gizonde': { 'target': 1 },
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
                'mst': { x: 2, y: 4, code: 'KeyV' },
            },
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 4, y: 1, code: 'KeyT' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 4, y: 0, code: 'Key5' },
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
            'gizonde': { 'target': 1 },
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
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 4, y: 1, code: 'KeyT' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 4, y: 0, code: 'Key5' },
            },
        ]
    },
    'ep1-glitchless-allMissions-force': {
        'name': "Episode 1 Glitchless All Missions Force",
        'trackables': {
            'foie': { 'min': 1 },
            'barta': { 'target': 1 },
            'zonde': { 'target': 1 },
            'gifoie': {
                'target': 1,
                'targetUnless': ['rafoie']
            },
            'gibarta': {},
            'gizonde': { 'target': 1 },
            'rafoie': { 'target': 1 },
            'rabarta': { 'target': 1 },
            'razonde': { 'target': 1 },
            'hp': {},
            'mst': {},
            'slots': {},
            'barrier': { 'target': 1 },
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
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 4, y: 1, code: 'KeyT' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 4, y: 0, code: 'Key5' },
            },
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 0, y: 1, code: 'Digit3' },
                'barta': { x: 1, y: 1, code: 'KeyQ' },
                'gibarta': { x: 2, y: 0, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'zonde': { x: 3, y: 0, code: 'KeyA' },
                'gizonde': { x: 3, y: 1, code: 'KeyS' },
                'razonde': { x: 4, y: 0, code: 'KeyD' },
                'mst': { x: 4, y: 1, code: 'Digit4' },
                'slots': { x: 5, y: 0, code: 'KeyT' },
            },
        ]
    },
    'ep2-glitchless-force': {
        'name': "Episode 2 Glitchless Force",
        'trackables': {
            'foie': { 'min': 1, 'target': 3 },
            'barta': { 'initial': 1, 'target': 2 },
            'zonde': { 'target': 1 },
            'gifoie': {
                'target': 1,
                'targetUnless': ['rafoie']
            },
            'gibarta': {},
            'gizonde': { 'target': 1 },
            'rafoie': { 'target': 1 },
            'rabarta': { 'target': 1 },
            'razonde': {},
            'hp': { 'target': 31 },
            'mst': {},
            'slots': { 'target': 3},
            'barrier': { 'target': 1 },
            'scape': {},
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
                'scape': {x: 4, y: 2, code: 'KeyV'},
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
                'scape': {x: 4, y: 2, code: 'KeyV'},
            },
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 4, y: 1, code: 'KeyT' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 4, y: 0, code: 'Key5' },
                'scape': {x: 4, y: 2, code: 'KeyV'},
            },
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 0, y: 1, code: 'Digit3' },
                'barta': { x: 1, y: 1, code: 'KeyQ' },
                'gibarta': { x: 2, y: 0, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'zonde': { x: 3, y: 0, code: 'KeyA' },
                'gizonde': { x: 3, y: 1, code: 'KeyS' },
                'razonde': { x: 4, y: 0, code: 'KeyD' },
                'mst': { x: 4, y: 1, code: 'Digit4' },
                'slots': { x: 5, y: 0, code: 'KeyT' },
                'scape': {x: 4, y: 2, code: 'KeyV'},
            },
        ]
    },
    'ep1-glitchless-allMissions-force-soulEater': {
        'name': "Episode 1 Glitchless All Missions Force + Soul Eater",
        'trackables': {
            'foie': { 'min': 1 },
            'barta': { 'target': 1 },
            'zonde': { 'target': 1 },
            'gifoie': {
                'target': 1,
                'targetUnless': ['rafoie']
            },
            'gibarta': {},
            'gizonde': { 'target': 1 },
            'rafoie': { 'target': 1 },
            'rabarta': { 'target': 1 },
            'razonde': { 'target': 1 },
            'hp': {},
            'mst': {},
            'slots': {},
            'barrier': { 'target': 1 },
            'souleater': { 'target': 1 },
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
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'rafoie': { x: 2, y: 0, code: 'Digit3' },
                'mst': { x: 3, y: 0, code: 'Digit4' },
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'gibarta': { x: 1, y: 1, code: 'KeyW' },
                'rabarta': { x: 2, y: 1, code: 'KeyE' },
                'barrier': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 4, y: 1, code: 'KeyT' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 4, y: 0, code: 'Key5' },
                'souleater': { x: 4, y: 2, code: 'KeyG' },
            },
        ]
    },
    'ep1-glitchless-any%-hucaseal': {
        'name': "Episode 1 Glitchless Any% HUcaseal",
        'trackables': {
            'saber': { 'min': 1, 'target': 2 },
            'dagger': { 'target': 2 },
            'sword': { 'target': 1 },
            'partisan': { 'target': 1 },
            'handgun': { 'target': 3 },
            'slots': { 'target': 3 },
            'ata': {},
            'atp': {},
        },
        'layouts': [
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 1, y: 0, code: 'Digit2' },
                'sword': { x: 2, y: 0, code: 'Digit3' },
                'partisan': { x: 3, y: 0, code: 'Digit4' },
                'handgun': { x: 0, y: 1, code: 'KeyQ' },
                'slots': { x: 1, y: 1, code: 'KeyW' },
                'ata': { x: 2, y: 1, code: 'KeyE' },
                'atp': { x: 3, y: 1, code: 'KeyR' }
            },
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 0, y: 1, code: 'Digit2' },
                'sword': { x: 0, y: 2, code: 'Digit3' },
                'partisan': { x: 0, y: 3, code: 'Digit4' },
                'handgun': { x: 0, y: 4, code: 'KeyQ' },
            },
        ]
    },
    'ep1-glitchless-any%-hucast': {
        'name': "Episode 1 Glitchless Any% HUcast",
        'trackables': {
            'saber': { 'min': 1, 'target': 3 },
            'dagger': { 'target': 2 },
            'sword': { 'target': 2 },
            'partisan': { 'target': 1 },
            'handgun': { 'target': 2 },
            'mechgun': {},
            'ata': {},
            'atp': {},
        },
        'layouts': [
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 1, y: 0, code: 'Digit2' },
                'sword': { x: 2, y: 0, code: 'Digit3' },
                'partisan': { x: 3, y: 0, code: 'Digit4' },
                'handgun': { x: 0, y: 1, code: 'KeyQ' },
                'mechgun': { x: 1, y: 1, code: 'KeyW' },
                'ata': { x: 2, y: 1, code: 'KeyE' },
                'atp': { x: 3, y: 1, code: 'KeyR' }
            },
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 0, y: 1, code: 'Digit2' },
                'sword': { x: 0, y: 2, code: 'Digit3' },
                'partisan': { x: 0, y: 3, code: 'Digit4' },
                'handgun': { x: 0, y: 4, code: 'KeyQ' },
            },
        ]
    },
    'ep1-glitchless-any%-hunewearl': {
        'name': "Episode 1 Glitchless Any% HUnewearl",
        'trackables': {
            'saber': { 'min': 1, 'target': 2 },
            'sword': { 'target': 1 },
            'partisan': { 'target': 1 },
            'handgun': { 'target': 2 },
            'ata': { },
            'atp': { },
            'hp': { 'target': 1 },
            'mst': { 'target': 15 },
            'foie': { 'target': 2 },
            'zonde': { 'target': 1 },
            'barta': {'target': 2},
            'gifoie': {'target': 1},
            'gizonde': {'target': 1},
            'rabarta': {'target': 1},
            'slots': {'target': 1}
        },
        'layouts': [
            {
                'foie': { x: 0, y: 0, code: 'Digit1' },
                'gifoie': { x: 1, y: 0, code: 'Digit2' },
                'mst': { x: 2, y: 0, code: 'Digit3' },
                'saber': {x: 3, y: 0, code: 'Digit4'},
                'barta': { x: 0, y: 1, code: 'KeyQ' },
                'rabarta': { x: 1, y: 1, code: 'KeyW' },
                'slots': { x: 2, y: 1, code: 'KeyE' },
                'sword': { x: 3, y: 1, code: 'KeyR' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'hp': { x: 2, y: 2, code: 'KeyD' },
                'handgun': { x: 3, y: 2, code: 'KeyF' },
            }
        ]
    },
    'ep1-glitchless-true-dark-falz': {
        'name': "Episode 1 Glitchless True Dark Falz HUcast",
        'trackables': {
            'saber': { 'min': 1, 'target': 4 },
            'dagger': { 'target': 3 },
            'sword': { 'target': 3 },
            'partisan': { 'target': 3 },
            'handgun': { 'target': 4 },
            'hp': { 'target': 10 },
            'slots': { 'target': 3 },
            'grants-damage': {},
            'ata': {},
            'atp': {},
        },
        'layouts': [
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 1, y: 0, code: 'Digit2' },
                'sword': { x: 2, y: 0, code: 'Digit3' },
                'partisan': { x: 3, y: 0, code: 'Digit4' },
                'handgun': { x: 0, y: 1, code: 'KeyQ' },
                'hp': { x: 1, y: 1, code: 'KeyW' },
                'ata': { x: 2, y: 1, code: 'KeyE' },
                'atp': { x: 3, y: 1, code: 'KeyR' },
                'slots': { x: 4, y: 0, code: 'Digit5' },
                'grants-damage': { x: 4, y: 1, code: 'KeyT' }
            },
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 0, y: 1, code: 'Digit2' },
                'sword': { x: 0, y: 2, code: 'Digit3' },
                'partisan': { x: 0, y: 3, code: 'Digit4' },
                'handgun': { x: 0, y: 4, code: 'KeyQ' },
            },
        ]
    },
    'ep1-glitchless-any%-hucast-souleater': {
        'name': "Episode 1 Glitchless Any% HUcast w/Soul Eater",
        'trackables': {
            'saber': { 'min': 1, 'target': 3 },
            'dagger': { 'target': 2 },
            'sword': { 'target': 2 },
            'partisan': { 'target': 1 },
            'handgun': { 'target': 3 },
            'slots': {},
            'ata': {},
            'atp': {},
            'souleater': { 'target': 1 },
        },
        'layouts': [
            {
                'saber': { x: 0, y: 0, code: 'Digit1' },
                'dagger': { x: 1, y: 0, code: 'Digit2' },
                'sword': { x: 2, y: 0, code: 'Digit3' },
                'partisan': { x: 3, y: 0, code: 'Digit4' },
                'handgun': { x: 0, y: 1, code: 'KeyQ' },
                'slots': { x: 1, y: 1, code: 'KeyW' },
                'ata': { x: 2, y: 1, code: 'KeyE' },
                'atp': { x: 3, y: 1, code: 'KeyR' },
                'souleater': { x: 2, y: 2, code: 'KeyF' },
            },
        ]
    },
    'ep1-glitched-any%': {
        'name': "Glitched Any%",
        'trackables': {
            'saber-glitched': { 'initial': 22 },
            'handgun': { 'initial': 1 },
            'rifle': { 'initial': 1 },
            'mechgun': { 'target': 1 },
            'shot': { 'target': 1 },
            'ata': {},
        },
        'layouts': [
            {
                'saber-glitched': { x: 0, y: 0, code: 'Digit1' },
                'rifle': { x: 1, y: 0, code: 'Digit2' },
                'mechgun': { x: 2, y: 0, code: 'Digit3' },
                'shot': { x: 2, y: 1, code: 'Digit4' },
                'handgun': { x: 0, y: 1, code: 'KeyQ' },
                'ata': { x: 1, y: 1, code: 'KeyE' }
            },
        ]
    },
    'three-class-relay': {
        'name': "Three Class Relay",
        'trackables': {
            'foie': { 'min': 1 },
            'barta': { 'target': 1 },
            'zonde': { 'target': 1 },
            'gifoie': {
                'target': 1,
                'targetUnless': ['rafoie']
            },
            'gibarta': {},
            'gizonde': { 'target': 1 },
            'rafoie': { 'target': 1 },
            'rabarta': { 'target': 1 },
            'razonde': { 'target': 1 },
            'hp': {},
            'mst': {},
            'slots': {},
            'barrier': { 'target': 1 },
            'handgun': { 'target': 3 },
            'shot': { 'target': 1 },
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
                'slots': { x: 4, y: 1, code: 'KeyT' },
                'zonde': { x: 0, y: 2, code: 'KeyA' },
                'gizonde': { x: 1, y: 2, code: 'KeyS' },
                'razonde': { x: 2, y: 2, code: 'KeyD' },
                'hp': { x: 4, y: 0, code: 'Key5' },
                'handgun': { x: 3, y: 2, code: 'KeyG' },
                'shot': { x: 4, y: 2, code: 'KeyF' }
            },
        ]
    },
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
