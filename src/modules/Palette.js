import * as SVG from '@svgdotjs/svg.js';
import Model from './Model';
import KeyController from './KeyController';
import PaletteBakery from './PaletteBakery';

/** @typedef {import('./PaletteProfiles').LayoutEntry} LayoutEntry */
/** @typedef {import('./PaletteProfiles').TrackerLayout} TrackerLayout */
/** @typedef {import('./Trackables').TrackableReference} TrackableKey */

/**
 * Extra features and behaviors to set for a Palette. 
 * @typedef {Object} PaletteOptions
 * @param {number} [iconScale] - Amount to scale each cell icon by
 * @param {boolean} [cellControls] - Render the cell as a button
 * @param {boolean} [incrementControls] - Render each increment level as a button
 * @param {boolean} [displayValue] - Display current value for the cell
 * @param {boolean} [displayKey] - Display the base keybinding for the cell
 * @param {boolean} [outerEdge] - Display an extra border around the outer palette cells
 * @param {string|Array.<string>} [cssClass] - CSS class or classes to add to the SVG groups
 */

/**
 * Default width and height for images in the palette when not specified by trackable attributes.
 * @constant {number}
 */
const DEFAULT_IMAGE_SIZE = 80;

/**
 * Extra margin to apply on the edges of the palette. Helps offset coordinates so the outer border always has positive coordinates.
 * @constant {number}
 */
const DEFAULT_GLOBAL_MARGIN = 5;

/**
 * X offset of the first increment control in a palette cell from the center.
 * @constant {number}
 */
const INCREMENT_CONTROL_OFFSET_X = 22;

/**
 * Y offset of the first increment control in a palette cell from the center.
 * @constant {number}
 */
const INCREMENT_CONTROL_OFFSET_Y = 31;

/**
 * Distance between increment controls.
 * @constant {number}
 */
const INCREMENT_CONTROL_SPACING = 15;

/**
 * A view and user interface to the tracker {@link Model}.
 * Offers different options for how to display input. 
 */
export default class Palette {

    /**
     * @param {Model} model - Data model to read data from and write data to
     * @param {SVGElement} svgRoot - Node to render SVG elements into
     * @param {HTMLElement} statusArea - Node to use to show 
     * @param {KeyController} keyController - Keyboard controller to interact with
     * @param {PaletteOptions} options - Extra features and behaviors to set for this instance
     */
    constructor(model, svgRoot, statusArea, keyController, options) {
        if (!(model instanceof Model))
            throw new TypeError("Expected a Model for the model parameter");
        this.model = model;

        if (!(svgRoot instanceof SVGElement))
            throw new TypeError("Expected an SVGElement for the svgRoot parameter");
        this.svg = SVG.adopt(svgRoot);

        if (statusArea !== null && !(statusArea instanceof HTMLElement))
            throw new TypeError("Expected null or an HTMLElement for the KeyController parameter");
        this.statusArea = statusArea;

        if (keyController !== null && !(keyController instanceof KeyController))
            throw new TypeError("Expected null or a KeyController for the KeyController parameter");
        this.keyController = keyController;

        if (options === null)
            this.features = {};
        if (typeof options !== 'object')
            throw new TypeError("Expected an object for the options parameter");
        this.features = options;

        model.RegisterChangeHandler(event => this.RefreshCell(event.trackKey));
        if (keyController !== null) {
            keyController.RegisterInputHandler(event => {
                if (this.layout === null)
                    return;
                for (const trackKey of Object.keys(this.layout)) {
                    //refresh all cells, except any that was just refreshed from being pressed
                    if (trackKey != event.trackKey)
                        this.RefreshCell(trackKey);
                }
            });
        }

        this.globalMargin = DEFAULT_GLOBAL_MARGIN;
        this._containerSymbol = this.svg.symbol()
            .polygon(PaletteBakery.CellContainerHex().corners().map(({ x, y }) => `${x},${y}`))
            .addClass('container');

        this._cellSymbol = this.svg.symbol()
            .polygon(PaletteBakery.CellHex().corners().map(({ x, y }) => `${x},${y}`))
            .addClass('palette');

        this.features = options;
        this.layout = null;
        this.hexes = [];
        this.groups = {};
        this.cells = {};

        this._elementCache = {};
    }

    /**
     * Returns information on the coordinate space extent of this palette.
     * @return {{x:number, y:number, x2:number, y2:number}} Bounding box information about the SVG container of the palette.
     */
    GetBounds() {
        return this.svg.bbox();
    }

    /**
     * Create all elements and callbacks for featues using a layout definition.
     * @param {TrackerLayout} layout - Layout defining what cells/trackables to show
     * @param {number} offsetX - Amount to translate SVG elements by on the X axis
     * @param {number} offsetY - Amount to translate SVG elements by on the Y axis
     */
    Render(layout, offsetX = 0, offsetY = 0) {
        this.layout = layout;

        this._elementCache = {};

        this.svg.translate(offsetX, offsetY);

        this.RenderPrimitives(); //sets this.groups, this.hexes, this.cells

        if (this.features.cssClass) {
            if (Array.isArray(this.features.cssClass)) {
                for (let cssClass of this.features.cssClass)
                    this.svg.addClass(cssClass);
            }
            else {
                this.svg.addClass(this.features.cssClass);
            }
        }

        if (this.features.cellControls)
            this.RenderCellControls();

        if (this.features.incrementControls)
            this.RenderIncrementControls();

        if (this.features.outerEdge)
            this.RenderOuterEdge();

        if (this.statusArea)
            this.SetUpStatusArea();

        this.RenderTexts();
    }

    /**
     * Creates the SVG cells for the palette.
     */
    RenderPrimitives() {
        let imageSizeFactor = this.features.iconScale ? this.features.iconScale : 1;
        for (const [trackKey, coords] of Object.entries(this.layout)) {
            this._elementCache[trackKey] = {};

            const trackable = this.model.trackables[trackKey];
            // calculate pixel coordinates from hex coordinates
            let hex = PaletteBakery.CellContainerHex(coords);
            const origin = hex.toPoint();
            const tx = origin.x + hex.width() / 2 + this.globalMargin;
            const ty = origin.y + hex.height() / 2 + this.globalMargin;

            // support rendering the palette edge
            this.hexes.push(hex);

            var group = this.svg.group().translate(tx, ty);
            this.groups[trackKey] = group;

            group.use(this._containerSymbol);

            var cell = group.use(this._cellSymbol)
                .addClass('palette');
            this.cells[trackKey] = cell;

            let image, label;
            if (image = trackable.image) {
                let offsetY = trackable.imageOffsetY || 0;
                let imageSizeX, imageSizeY;
                if (trackable.imageWidth && trackable.imageHeight) {
                    imageSizeX = trackable.imageWidth;
                    imageSizeY = trackable.imageHeight;
                }
                else {
                    imageSizeX = imageSizeY = DEFAULT_IMAGE_SIZE;
                }

                group.image(image)
                    .size(imageSizeFactor * imageSizeX, imageSizeFactor * imageSizeY)
                    .translate(imageSizeFactor * -imageSizeX / 2, imageSizeFactor * (-imageSizeY / 2 + offsetY))
                    ;
            }
            if (label = this.model.trackables[trackKey].label) {
                let labelObject = group.plain(label);
                labelObject.addClass('label');
                //let CSS handle the font, svg.js..
                labelObject.attr('font-family', null);
            }
        }
    }

    /**
     * Makes the cell act as a button
     * @return {undefined}
     */
    RenderCellControls() {
        for (const [trackKey, cell] of Object.entries(this.cells)) {
            cell.on('click', () => this.model.IncrementValue(trackKey, this.GetInputLevel(trackKey), this.GetInputFactor()));
            cell.on('contextmenu', event => {
                this.model.IncrementValue(trackKey, this.GetInputLevel(trackKey), -1);
                event.preventDefault();
            });
        }
    }

    /**
     * Update the status area with text used for a given trackable.
     * @param {TrackableKey} trackKey - Reference to a trackable
     */
    UpdateStatusArea(trackKey) {
        let str = `<strong>${this.model.GetAttribute(trackKey, 'description', trackKey)}</strong>`;
        if (this.keyController) {
            str += ` ${this.keyController.GetAllIncrementsDisplayText(trackKey)}`;
        }
        this.statusArea.innerHTML = str;
    }

    /**
     * Set up event handlers to update the text of the status area based on the cell hovered over.
     * @return {undefined}
     */
    SetUpStatusArea() {
        for (const [trackKey, cell] of Object.entries(this.cells)) {
            cell.on('mouseover', () => this.UpdateStatusArea(trackKey));
            cell.on('mouseleave', () => this.statusArea.innerHTML = '');
        }
    }

    /**
     * Adds pressable text for each increment level for each trackable.
     * Automatically will change the text to reflect keypresses such as Shift to subtract.
     * @return {undefined}
     */
    RenderIncrementControls() {
        for (const [trackKey, group] of Object.entries(this.groups)) {
            let increments = [];
            let incrementData = this.model.GetAttribute(trackKey, 'increment', [1]);
            for (let level in incrementData) {
                //slide along the SE edge but go counter clockwise
                const angle = PaletteBakery.EDGE_ANGLES.SE + Math.PI;

                let incrementText = group.plain("")
                    .translate(
                        Math.cos(angle) * level * INCREMENT_CONTROL_SPACING + INCREMENT_CONTROL_OFFSET_X,
                        Math.sin(angle) * level * INCREMENT_CONTROL_SPACING + INCREMENT_CONTROL_OFFSET_Y
                    )
                    .addClass('increment')
                    .attr('font-family', null); //let CSS handle the font, svg.js..

                //instead of reordering the element tree and using sibling selectors, we'll just settle for this.
                incrementText.on('mouseover', event => {
                    //add 'highlight' to the parent group
                    event.target.parentNode.classList.add('highlight');
                    if (this.keyController)
                        this.keyController.OverrideInputLevel(trackKey, level);
                    this.UpdateStatusArea(trackKey);
                    this.RefreshCell(trackKey);
                });
                incrementText.on('mouseleave', event => {
                    //remove 'highlight' to the parent group
                    event.target.parentNode.classList.remove('highlight');
                    if (this.keyController)
                        this.keyController.OverrideInputLevel(trackKey, null);
                    this.RefreshCell(trackKey);
                });
                incrementText.on('click', () => this.model.IncrementValue(trackKey, this.GetInputLevel(trackKey), this.GetInputFactor()));
                incrementText.on('contextmenu', event => {
                    this.model.IncrementValue(trackKey, this.GetInputLevel(trackKey), -1);
                    event.preventDefault();
                });
                increments.push(incrementText.node);
            }

            this._elementCache[trackKey].increments = increments;
        }
    }

    /**
     * Creates text containers for the keybinds and cell values.
     */
    RenderTexts() {
        for (const [trackKey, group] of Object.entries(this.groups)) {
            let cache = this._elementCache[trackKey];
            cache.group = group.node;
            if (this.features.displayValue) {
                let textGlow = group.plain("").addClass('glow').addClass('value');
                let cellText = group.plain("").addClass('value');

                cache.text = cellText.node;
                cache.glow = textGlow.node;

                //let CSS handle the font, svg.js..
                cellText.attr('font-family', null);
                textGlow.attr('font-family', null);
            }

            if (this.features.displayKey) {
                var text = group.plain("").addClass('key');

                cache.key = text.node;

                //let CSS handle the font, svg.js..
                text.attr('font-family', null);
            }

            this.RefreshCell(trackKey);
        }
    }

    /**
     * Gets the text to show for a trackable value
     * @param {TrackableKey} trackKey - Reference to a trackable
     * @return {string} Current value if non-zero, target information is shown if applicable
     */
    GetCellValueText(trackKey) {
        let text = this.model.values[trackKey];
        if (text !== void 0) {
            var target = this.model.GetTarget(trackKey);
            if (target.value && !target.fulfilled) {
                text += "/" + target.value;
            }
        }
        if (text == 0)
            return "";
        if (text == 1 && this.model.GetAttribute(trackKey, 'toggle'))
            text = "&#10004;";
        return text;
    }

    /**
     * Gets the text to show for a keyboard code (as defined on the layout)
     * @see {KeyboardEvent.code}
     * @see {LayoutEntry.code}
     * @param {TrackableKey} trackKey - Reference to a trackable
     * @return {string} Key to press for the passed trackable (or blank if no {@link KeyController} was set to this palette)
     */
    GetCellKeyText(trackKey) {
        if (!this.keyController)
            return "";

        return this.keyController.GetKeyCodeDisplayText(trackKey);
    }

    /**
     * Update a trackable's cell to apply CSS classes and current text values
     * @param {TrackableKey} trackKey - Reference to a trackable
     * @return {undefined}
     */
    RefreshCell(trackKey) {
        if (!(trackKey in this._elementCache))
            return;

        let cache = this._elementCache[trackKey];

        if (this.features.displayValue) {
            if (this.model.values[trackKey] == 0) {
                cache.group.classList.add('inactive');
            }
            else {
                cache.group.classList.remove('inactive');
            }
        }

        if (this.features.displayValue) {
            let text = this.GetCellValueText(trackKey);
            cache.text.innerHTML = text;
            cache.glow.innerHTML = text;
        }

        if (this.features.displayKey) {
            cache.key.innerHTML = this.GetCellKeyText(trackKey);
        }

        if (this.features.incrementControls) {
            let increments = this.model.GetAttribute(trackKey, 'increment', [1]);
            let currentInputLevel = this.GetInputLevel(trackKey);
            for (let level in increments) {
                let incrementText = (this.GetInputFactor() < 0 ? "-" : "+") + increments[level];
                let node = cache.increments[level];
                node.innerHTML = incrementText;
                if (level == currentInputLevel)
                    node.classList.add('highlight');
                else
                    node.classList.remove('highlight');
            }
        }
    }

    /**
     * Create an order border that wraps all cells.
     */
    RenderOuterEdge() {
        let containerGrid = PaletteBakery.ContainerGrid(this.hexes);
        let edgeSegments = [];
        for (const hex of containerGrid) {
            const origin = hex.toPoint();
            const tx = origin.x + hex.width() / 2 + this.globalMargin;
            const ty = origin.y + hex.height() / 2 + this.globalMargin;
            const edgeHex = PaletteBakery.EdgeHex(hex.coords);

            let allEdgeData = PaletteBakery.getHexEdgeData(containerGrid, hex, edgeHex);
            for (let edge of Object.values(allEdgeData)) {
                if (edge.hasAdjacentHex)
                    continue;
                let ax0 = edge.points[0].x + tx;
                let ax1 = edge.points[1].x + tx;
                let ay0 = edge.points[0].y + ty;
                let ay1 = edge.points[1].y + ty;

                if (allEdgeData[edge.connectedEdges[0]].hasAdjacentHex) {
                    ax0 += Math.cos(edge.angle) * PaletteBakery.EDGE_MARGIN;
                    ay0 += Math.sin(edge.angle) * PaletteBakery.EDGE_MARGIN;
                }
                if (allEdgeData[edge.connectedEdges[1]].hasAdjacentHex) {
                    ax1 -= Math.cos(edge.angle) * PaletteBakery.EDGE_MARGIN;
                    ay1 -= Math.sin(edge.angle) * PaletteBakery.EDGE_MARGIN;
                }

                edgeSegments.push([ax0, ay0, ax1, ay1]);
            }
        }
        this.svg.polygon(PaletteBakery.convertSegmentsToPolyline(edgeSegments)).addClass('edge');
    }

    /**
     * Get the increment level that should be used when pressing a control in the cell for a given trackable
     * @param {TrackableKey} trackKey - A reference to a trackable
     * @return {number} 0 if not associated with a {@link KeyController}, else see {@link KeyController.GetInputLevel}
     */
    GetInputLevel(trackKey) {
        if (this.keyController !== null)
            return this.keyController.GetInputLevel(trackKey);
        return 0;
    }

    /**
     * Get the input factor that will be applied when pressing a control in a cell (e.g. 1 or -1 to add or subtract values)
     * @return {number} 1 if not associated with a {@link KeyController}, else see {@link KeyController.GetInputFactor}
     */
    GetInputFactor() {
        if (this.keyController !== null)
            return this.keyController.InputFactor;
        return 1;
    }
}

