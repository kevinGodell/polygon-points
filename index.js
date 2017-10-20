// jshint esversion: 6, globalstrict: true, strict: true
'use strict';

function PolygonPoints (vertexes) {
    this._checkVertexes(vertexes);
}

PolygonPoints.prototype._checkVertexes = function (vertexes) {
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
    this._calculateBoundingBox();
    this._countPointsInPolygon();
};

PolygonPoints.prototype._calculateBoundingBox = function () {
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
    this._boundingBox = [{x: this._minX, y: this._minY}, {x :this._minX, y: this._maxY}, {x: this._maxX, y: this._maxY}, {x: this._maxX, y: this._minY}];
};

PolygonPoints.prototype._countPointsInPolygon = function () {
    let counter = 0;
    for (let y = this._minY; y < this._maxY; y++) {
        for (let x = this._minX; x < this._maxX; x++) {
            if (this.containsPoint({x: x, y: y}) === true) {
                counter++;
            }
        }
    }
    this._pointsLength = counter;
};

PolygonPoints.prototype.boundingBox = function () {
    return this._boundingBox;
};

PolygonPoints.prototype.pointsLength = function () {
    return this._pointsLength;
};

PolygonPoints.prototype.containsPoint = function (point) {
    //algorithm based on http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    const x = point.x;
    const y = point.y;
    if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
        return false;
    }
    let inside = false;
    const length = this._vertexesLength;
    const array = this._vertexes;
    for (let i = 0, j = length - 1; i < length; j = i++) {
        const xi = array[i].x;
        const yi = array[i].y;
        if (x === xi && y === yi) {
            return true;
        }
        const xj = array[j].x;
        const yj = array[j].y;
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
};

module.exports = PolygonPoints;
//todo check if point is on edge of polygon