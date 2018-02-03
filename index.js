'use strict';

class PolygonPoints {

    constructor(vertexes) {
        this._checkVertexes(vertexes);
    }

    get pointsLength() {
        return this._pointsLength || this._countPointsInPolygon();
    }

    get boundingBox() {
        return [{x: this._minX, y: this._minY}, {x :this._minX, y: this._maxY}, {x: this._maxX, y: this._maxY}, {x: this._maxX, y: this._minY}];
    }

    set vertexes(value) {
        this._checkVertexes(value);
        delete this._pointsLength;
    }

    get vertexes() {
        return this._vertexes;
    }

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

    _countPointsInPolygon() {
        this._pointsLength = 0;
        for (let y = this._minY; y < this._maxY; y++) {
            for (let x = this._minX; x < this._maxX; x++) {
                if (this.containsPoint(x, y) === true) {
                    this._pointsLength++;
                }
            }
        }
        return this._pointsLength;
    }

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
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) {
                inside = !inside;
            }
        }
        return inside;
    }

    getBitset(width, height) {
        const length = width * height;
        const buffer = Buffer.alloc(length, 0);
        let count = 0;
        for (let y = 0, i = 0; y < width; y++) {
            for (let x = 0; x < width; x++, i++) {
                if (this.containsPoint(x, y) === true) {
                    buffer[i] = true;
                    count++;
                }
            }
        }
        return {buffer: buffer, count: count, length: length};
    }
}

module.exports = PolygonPoints;