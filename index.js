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
        if (!Array.isArray(vertex) || vertex.length !== 2 || vertex[0] < 0 || vertex[1] < 0) {
            throw new Error('Each vertex of the polygon must consist of an array of 2 unsigned integers.');
        }
    }
    this._vertexes = vertexes;
    this._vertexesLength = vertexes.length;
    this._calculateBoundingBox();
    this._countPointsInPolygon();
};

PolygonPoints.prototype._calculateBoundingBox = function () {
    this._maxX = this._vertexes[0][0];
    this._minX = this._vertexes[0][0];
    this._maxY = this._vertexes[0][1];
    this._minY = this._vertexes[0][1];
    for (let i = 1; i < this._vertexesLength; i++) {
        this._maxX = Math.max(this._maxX, this._vertexes[i][0]);
        this._minX = Math.min(this._minX, this._vertexes[i][0]);
        this._maxY = Math.max(this._maxY, this._vertexes[i][1]);
        this._minY = Math.min(this._minY, this._vertexes[i][1]);
    }
    this._boundingBox = [[this._minX, this._minY], [this._minX, this._maxY], [this._maxX, this._maxY], [this._maxX, this._minY]];
};

PolygonPoints.prototype._countPointsInPolygon = function () {
    let counter = 0;
    for (let y = this._minY; y < this._maxY; y++) {
        for (let x = this._minX; x < this._maxX; x++) {
            if (this.containsPoint([x, y]) === true) {
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
    const x = point[0];
    const y = point[1];
    if (x < this._minX || x > this._maxX || y < this._minY || y > this._maxY) {
        return false;
    }
    let inside = false;
    const length = this._vertexesLength;
    const array = this._vertexes;
    for (let i = 0, j = length - 1; i < length; j = i++) {
        const xi = array[i][0];
        const yi = array[i][1];
        if (x === xi && y === yi) {
            return true;
        }
        const xj = array[j][0];
        const yj = array[j][1];
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
};

module.exports = PolygonPoints;
//todo check if point is on edge of polygon