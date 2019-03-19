'use strict';

class PolygonPoints {

    /**
     *
     * @param {Array} vertexes - Array of objects containing x and y value.
     */
    constructor(vertexes) {
        this._checkVertexes(vertexes);
    }

    /**
     *
     * Get the total number of x y points that exist in polygon.
     * @readonly
     * @returns {Number}
     */
    get pointsLength() {
        return this._pointsLength || this._countPointsInPolygon();
    }

    /**
     *
     * Get the bounding box as an array of x y coordinates.
     * @readonly
     * @returns {Array}
     */
    get boundingBox() {
        return [{x: this.minX, y: this.minY}, {x: this.maxX, y: this.minY}, {x: this.maxX, y: this.maxY}, {x :this.minX, y: this.maxY}];
    }

    /**
     *
     * Get the minimum x value.
     * @readonly
     * @returns {Number}
     */
    get minX() {
        return this._minX || 0;
    }

    /**
     *
     * Get the maximum x value.
     * @readonly
     * @returns {Number}
     */
    get maxX() {
        return this._maxX || 0;
    }

    /**
     *
     * Get the minimum y value.
     * @readonly
     * @returns {Number}
     */
    get minY() {
        return this._minY || 0;
    }

    /**
     *
     * Get the maximum y value.
     * @readonly
     * @returns {Number}
     */
    get maxY() {
        return this._maxY || 0;
    }

    /**
     * @ignore
     * @param {Array} value - Array of objects containing x and y value.
     */
    set vertexes(value) {
        this._checkVertexes(value);
        delete this._pointsLength;
    }

    /**
     *
     * Get or set the array of vertexes.
     * @returns {Array}
     */
    get vertexes() {
        return this._vertexes || [];
    }

    /**
     *
     * @param {Array} vertexes - Array of objects containing x and y value.
     * @private
     */
    _checkVertexes(vertexes) {
        if (!Array.isArray(vertexes) || vertexes.length < 3) {
            throw new Error('Polygon needs at least 3 sets of x y vertexes.');
        }
        for (const vertex of vertexes) {
            const x = vertex.x;
            const y = vertex.y;
            if (x < 0 || y < 0 || parseInt(x) !== x || parseInt(y) !== y) {
                throw new Error('Each vertex of the polygon must consist of an object with an x and y unsigned integer.');
            }
        }
        this._vertexes = vertexes;
        this._vertexesLength = vertexes.length;
        this._maxX = this._vertexes[0].x;
        this._minX = this._vertexes[0].x;
        this._maxY = this._vertexes[0].y;
        this._minY = this._vertexes[0].y;
        for (let i = 1; i < this._vertexesLength; i++) {
            this._maxX = Math.max(this._maxX, this._vertexes[i].x);
            this._minX = Math.min(this._minX, this._vertexes[i].x);
            this._maxY = Math.max(this._maxY, this._vertexes[i].y);
            this._minY = Math.min(this._minY, this._vertexes[i].y);
        }
    }

    /**
     *
     * @returns {Number}
     * @private
     */
    _countPointsInPolygon() {
        this._pointsLength = 0;
        for (let y = this._minY; y <= this._maxY; y++) {
            for (let x = this._minX; x <= this._maxX; x++) {
                if (this.containsPoint(x, y) === true) {
                    this._pointsLength++;
                }
            }
        }
        return this._pointsLength;
    }

    /**
     *
     * Check if x y point is contained in polygon.
     * @param {Number} x - x coordinate
     * @param {Number} y - y coordinate
     * @returns {Boolean}
     */
    containsPoint(x, y) {
        //algorithm based on http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
            return false;
        }
        let inside = false;
        const length = this._vertexesLength;
        const array = this._vertexes;
        for (let i = 0, j = length - 1; i < length; j = i++) {
            const xi = array[i].x;
            const yi = array[i].y;
            const xj = array[j].x;
            const yj = array[j].y;
            if ((xi === x && yi === y) || (xj === x && yj === y)) {
                // point is on corner
                return true;
            }
            if (Math.hypot(xj - xi, yj - yi) === Math.hypot(xj - x, yj - y) + Math.hypot(xi - x, yi - y)) {
                // point is on perimeter
                return true;
            }
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    }

    /**
     *
     * Get a Buffer of 0's and 1's to indicate if point's index is in polygon.
     * @param {Number} width - width of coordinates
     * @param {Number} height - height of coordinates
     * @returns {{buffer: Buffer, count: number, length: number}}
     */
    getBitset(width, height) {
        const length = width * height;
        const buffer = Buffer.alloc(length, 0);
        let count = 0;
        let minX = width;
        let maxX = 0;
        let minY = height;
        let maxY = 0;
        for (let y = 0, i = 0; y < height; y++) {
            for (let x = 0; x < width; x++, i++) {
                if (this.containsPoint(x, y) === true) {
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                    buffer[i] = 1;
                    count++;
                }
            }
        }
        return {buffer: buffer, count: count, length: length, minX: minX, maxX: maxX, minY: minY, maxY: maxY};
    }
}

/**
 *
 * @type {PolygonPoints}
 */
module.exports = PolygonPoints;