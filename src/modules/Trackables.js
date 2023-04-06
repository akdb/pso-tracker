/** @module Trackables */

import PaletteAssets from '../lib/pso-icons/palette/*.svg';
import grants from '../lib/pso-icons/palette/grants.svg';
import hp from '../assets/hp.svg';
import mst from '../lib/pso-icons/equipment/rod.svg';
import slots from '../lib/pso-icons/equipment/unit.svg';
import barrier from '../lib/pso-icons/equipment/barrier.svg';

/* Rorgigor pixel art */
import saber from '../assets/saber.png';
import shot from '../assets/shot.png';
import rifle from '../assets/rifle.png';
import daggers from '../assets/dagger.png';
import sword from '../assets/sword.png';
import partisan from '../assets/partisan.png';
import handgun from '../assets/handgun.png';
import mechguns from '../assets/mechgun.png';
import souleater from '../assets/souleater.png';

/* eslint-disable no-magic-numbers*/

/**
 * Reference to a trackable in {@link Trackables}.
 * @typedef {string} TrackableReference
 */


/**
 * Attributes for an item that can be recorded on the tracker.
 * @typedef {object} TrackableData
 * @property {string} [description] - HTML content to display to describe this item
 * @property {number} [min] - Minimum value. Default is 0
 * @property {number} [max] - Maximum value. Default is no maximum
 * @property {boolean} [toggle] - Makes the trackable an "on/off" which may be rendered differently. Overrides {@link TrackableData.max} by implying a max of 1
 * @property {number} [target] - Desired value. Default is no target
 * @property {Array.<TrackableReference>} [targetUnless] - Negates {@link TrackableData.target} when every trackable specified in the array has a non-zero value and has its target (if any) fulfilled
 * @property {Array.<number>} [increment] - List of possible increment levels for the user interface. Default is [1]
 * @property {string} [image] - Path to an image to use on the palette
 * @property {number} [imageWidth] - Define a fixed width for the image
 * @property {number} [imageHeight] - Define a fixed height for the image
 * @property {number} [imageOffsetY] - Define a translation offset along the Y-axis for the image
 * @property {string} [label] - Text to display alongside the image in the palette
 */


/**
 * Base definitions of all Trackables supported by this system.
 * @type {Object<TrackableReference, TrackableData>}
 */
let Trackables = {
    'foie': {
        'max': 30,
        'description': 'Foie',
    },
    'barta': {
        'max': 30,
        'description': 'Barta',
    },
    'zonde': {
        'max': 30,
        'description': 'Zonde',
    },
    'gifoie': {
        'max': 30,
        'description': 'Gifoie',
    },
    'gibarta': {
        'max': 30,
        'description': 'Gibarta',
    },
    'gizonde': {
        'max': 30,
        'description': 'Gizonde',
    },
    'rafoie': {
        'max': 30,
        'description': 'Rafoie',
    },
    'rabarta': {
        'max': 30,
        'description': 'Rabarta',
    },
    'razonde': {
        'max': 30,
        'description': 'Razonde',
    },
    'grants-damage': {
        'initial': 311,
        'max': 311,
        'image': grants,
        'increment': [1, 15.55],
        'description': 'Grants Damage Taken',
    },
    'hp': {
        'max': 650,
        'increment': [1, 2, 10],
        'image': hp,
        'imageWidth': 70,
        'imageHeight': 70,
        'label': 'HP+',
        'description': 'HP Boost',
    },
    'mst': {
        'max': 1100,
        'increment': [1, 2, 5],
        'label': 'MST+',
        'image': mst,
        'imageWidth': 40,
        'imageHeight': 40,
        'imageOffsetY': 10,
        'description': 'MST Boost',
    },
    'slots': {
        'max': 4,
        'image': slots,
        'imageWidth': 40,
        'imageHeight': 40,
        'description': 'Frame Slots',
    },
    'barrier': {
        'toggle': true,
        'image': barrier,
        'imageWidth': 40,
        'imageHeight': 40,
        'description': 'Barrier Obtained?',
    },
    'handgun': {
        max: 5,
        'image': handgun,
        'imagePhoton': true,
        'imageRotate': -70,
        'imageWidth': 35,
        'imageHeight': 35,
        'description': 'Handgun'
    },
    'mechgun': {
        max: 5,
        'image': mechguns,
        'imagePhoton': true,
        'imageRotate': -70,
        'imageWidth': 50,
        'imageHeight': 50,
        'description': 'Mechgun'
    },
    'saber': {
        max: 5,
        'image': saber,
        'imagePhoton': true,
        'imageRotate': -15,
        'imageWidth': 58,
        'imageHeight': 58,
        'description': 'Saber',
    },
    'saber-glitched': {
        max: 30,
        'image': saber,
        'imageRotate': -15,
        'imageWidth': 58,
        'imageHeight': 58,
        'description': 'Saber',
    },
    'souleater': {
        'toggle': true,
        'image': souleater,
        'imageWidth': 60,
        'imageHeight': 60,
        'imageRotate': -15,
        'description': 'Soul Eater',
    },
    'sword': {
        max: 5,
        'image': sword,
        'imagePhoton': true,
        'imageRotate': -15,
        'imageWidth': 55,
        'imageHeight': 55,
        'description': 'Sword'
    },
    'partisan': {
        max: 5,
        'image': partisan,
        'imagePhoton': true,
        'imageRotate': -15,
        'imageWidth': 55,
        'imageHeight': 55,
        'description': 'Partisan'
    },
    'dagger': {
        max: 5,
        'image': daggers,
        'imagePhoton': true,
        'imageRotate': -15,
        'imageWidth': 50,
        'imageHeight': 50,
        'description': 'Dagger'
    },
    'shot': {
        max: 5,
        'image': shot,
        'imagePhoton': true,
        'imageRotate': -15,
        'imageWidth': 55,
        'imageHeight': 55,
        'description': 'Shot'
    },
    'rifle': {
        max: 5,
        'image': rifle,
        'imagePhoton': true,
        'imageRotate': -15,
        'imageWidth': 55,
        'imageHeight': 55,
        'description': 'Rifle'
    },
    'atp': {
        'max': 1100,
        'increment': [1, 2, 5],
        'label': 'ATP+',
        'description': 'ATP Boost',
    },
    'ata': {
        'max': 200,
        'increment': [0.5, 1],
        'label': 'ATA+',
        'description': 'ATA Boost',
    },
    'resta': {
        'max': 30,
        'description': 'Resta',
        'label': 'Resta',
        'image': hp,
        'imageWidth': 70,
        'imageHeight': 70,
    },
    'scape': {
        'description': 'Scape Doll',
        'label': 'Scape Doll',
    }
};

for (let [key, value] of Object.entries(Trackables)) {
    if (!value.image) {
        if (PaletteAssets[key])
            value.image = PaletteAssets[key];
    }
}

export default Trackables;
