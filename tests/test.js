'use strict';

console.time('complete');

const assert = require('assert');

const PP = require('../index');

/*****************************************************************/

console.time('test 1');

let vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}];

let polygonPoints = new PP(vertexes);

assert(polygonPoints.pointsLength === 10000);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.boundingBox[3].x === 100);

console.timeEnd('test 1');

/*****************************************************************/

console.time('test 2');

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 50, y: 50}];

polygonPoints.vertexes = vertexes;

assert(polygonPoints.pointsLength === 2550);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.boundingBox[2].y === 50);

console.timeEnd('test 2');

/*****************************************************************/

console.time('test 3');

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}, {x: 50, y: 50}];

polygonPoints.vertexes = vertexes;

assert(polygonPoints.pointsLength === 7500);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.boundingBox[2].y === 100);

console.timeEnd('test 3');

/*****************************************************************/

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}, {x: 50, y: 150}];

polygonPoints.vertexes = vertexes;

console.time('test 4');

assert(polygonPoints.pointsLength === 9184);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.boundingBox[2].y === 150);

console.timeEnd('test 4');

/*****************************************************************/

console.timeEnd('complete');