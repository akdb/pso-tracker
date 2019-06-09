import PaletteAssets from '../lib/pso-icons/palette/*.svg';
import hp from '../assets/hp.svg';
import mst from '../lib/pso-icons/equipment/rod.svg';
import slots from '../lib/pso-icons/equipment/unit.svg';
import barrier from '../lib/pso-icons/equipment/barrier.svg';

/* eslint-disable no-magic-numbers*/

/**
 * Reference to a trackable in {@link Trackables}.
 * @typedef {string} TrackableReference
 */


/**
 * Attributes for an item that can be recorded on the tracker.
 * @typedef {Object} TrackableData
 * @property {string} [description] - HTML content to display to describe this item
 * @property {numeric} [min] - Minimum value. Default is 0
 * @property {numeric} [max] - Maximum value. Default is no maximum
 * @property {boolean} [toggle] - Makes the trackable an "on/off" which may be rendered differently. Overrides {@link TrackableData.max} by implying a max of 1
 * @property {numeric} [target] - Desired value. Default is no target
 * @property {Array.<TrackableReference>} [targetUnless] - Negates {@link TrackableData.target} when every trackable specified in the array has a non-zero value and has its target (if any) fulfilled
 * @property {Array.<numeric>} [increment] - List of possible increment levels for the user interface. Default is [1]
 * @property {string} [image] - Path to an image to use on the palette
 * @property {numeric} [imageWidth] - Define a fixed width for the image
 * @property {numeric} [imageHeight] - Define a fixed height for the image
 * @property {numeric} [imageOffsetY] - Define a translation offset along the Y-axis for the image
 * @property {string} [label] - Text to display alongside the image in the palette
 */


/**
 * Base definitions of all Trackables supported by this system.
 * @type {Object.<TrackableReference, TrackableData>}
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
    'hp': {
        'max': 650,
        'increment': [2, 10],
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
    }
};

for (let [key, value] of Object.entries(Trackables)) {
    if (!value.image) {
        if (PaletteAssets[key])
            value.image = PaletteAssets[key];
    }
}

export default Trackables;
