/** @module PaletteBakery */

import { extendHex as Hex, defineGrid as Grid } from 'honeycomb-grid';

/**
 * Dynamically calculate hexagon parameters for the hexagon-grid library,
 * mostly to automatically set the origin as the center of the hexagon.
 * @param {number} size - horizontal radius of the hexagon
 * @return {object} - data to pass to {@link Hex}
 */
function hexParameters(size) {
    return {
        'size': size,
        'origin': [size, size * Math.sqrt(3) / 2], // eslint-disable-line no-magic-numbers
        'orientation': 'flat',
    };
}

/**
 * Additional information on an edge of a hexagon cell in a grid
 * @typedef {object} HexEdgeData
 * @property {boolean} hasAdjacentHex - Whether there is a different cell attached to this edge in the grid
 * @property {Array.<string>} connectedEdges - Names of the edges adjacent to this edge
 * @property {Array.<object>} points - X,Y Objects describing the points of this edge
 * @property {number} angle - Angle of the edge in radians
 */

const EDGE_HEX_SIZE = 50;
const CONTAINER_HEX_SIZE = 46;
const CELL_HEX_SIZE = 42;
const EDGE_MARGIN = EDGE_HEX_SIZE - CONTAINER_HEX_SIZE;
const DEFAULT_MARGIN_OF_ERROR = 0.01;
const EDGE_NAMES = ['NE', 'SE', 'S', 'SW', 'NW', 'N'];
const EDGE_ANGLES = {
    'N': 0,
    'NE': Math.PI / 3,
    'SE': Math.PI * 2 / 3,
    'S': Math.PI,
    'SW': -Math.PI * 2 / 3,
    'NW': -Math.PI / 3
};
const EDGE_COUNT = EDGE_NAMES.length;

let CellContainerHex = hexParameters(CONTAINER_HEX_SIZE);

/**
 * Constants and definitions from the honeycomb-grid library used to render the palette.
 */
let PaletteBakery = {
    /**
     * Object used to calculate points for the outer edge of the palette.
     */
    EdgeHex: Hex(hexParameters(EDGE_HEX_SIZE)),

    /**
     * Object used to calculate points of the gaps between palette cells.
     */
    CellContainerHex: Hex(CellContainerHex),

    /**
     * Object used to calculate points of the cell
     */
    CellHex: Hex(hexParameters(CELL_HEX_SIZE)),

    /**
     * Object used to calculate points of each cell on the palette
     */
    ContainerGrid: Grid(CellContainerHex),

    /**
     * Horizontal radius of {@link PaletteBakery.CellContainerHex}
     */
    CONTAINER_HEX_SIZE: CONTAINER_HEX_SIZE,

    /**
     * The radius difference between {@link PaletteBakery.EdgeHex} and {@link CellContainerHex}
     */
    EDGE_MARGIN: EDGE_MARGIN,

    /**
     * The angle of each edge, keyed by edge name (N, NE, NW, S, SE, SW).
     * Faces "clockwise" (i.e., North is 0, Northeast is {@link Math.PI}/3)
     */
    EDGE_ANGLES: EDGE_ANGLES,

    /**
     * Return extra information about each edge of a hexagon cell in a grid
     * @param {Grid} grid - Hexagon grid
     * @param {Hex} hex - Hexagon cell in the grid to examine
     * @param {Hex} substituteHex - Alternate hexagon definition to use coordinates for while using the main hex for neighbor data
     * @return {Object<string,object>} Keyed edge data (keys are cardinal directions from {@link EDGE_NAMES})
     */
    getHexEdgeData: function (grid, hex, substituteHex = null) {
        if (substituteHex === null)
            substituteHex = hex;
        const corners = substituteHex.corners();
        let edgeData = {};
        for (let i = 0; i < EDGE_COUNT; ++i) {
            let name = EDGE_NAMES[i];
            let j = (i + EDGE_COUNT - 1) % EDGE_COUNT;
            let k = (i + 1) % EDGE_COUNT;
            edgeData[name] = {
                hasAdjacentHex: grid.neighborsOf(hex, name).length > 0,
                connectedEdges: [EDGE_NAMES[j], EDGE_NAMES[k]],
                points: [corners[j], corners[i]],
                angle: EDGE_ANGLES[name]
            };
        }
        return edgeData;
    },

    /**
     * Convert a set of line segments into a polyline by connecting up segments with close-enough points
     * @param {Array.<number[]>} segments - Line segments array defined as [x1,y1,x2,y2] arrays
     * @param {number} marginOfError - How close two points can be to be considered equivalent (square bounding box)
     * @return {Array.<number>} - X,Y points listed flatly in an array describing a polyline
     */
    convertSegmentsToPolyline: function (segments, marginOfError = DEFAULT_MARGIN_OF_ERROR) {
        let workSegments = segments.slice();
        let polyline = [workSegments[0][0], workSegments[0][1], workSegments[0][2], workSegments[0][3]];

        workSegments.splice(0, 1);
        let index = 2;

        while (workSegments.length > 0) {
            var nextSegmentIndex = workSegments.findIndex(
                segment => Math.abs(polyline[index] - segment[0]) < marginOfError && Math.abs(polyline[index + 1] - segment[1]) < marginOfError
            );
            if (nextSegmentIndex == -1)
                break;
            polyline.push(workSegments[nextSegmentIndex][2], workSegments[nextSegmentIndex][3]);
            workSegments.splice(nextSegmentIndex, 1);
            index += 2;
        }
        return polyline;
    },


};

export default PaletteBakery;
