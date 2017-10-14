// jshint esversion: 6, globalstrict: true, strict: true
'use strict';

console.time('complete');

const assert = require('assert');

const PP = require('../index');

/*****************************************************************/

let vertexes = [[0, 0], [100, 0], [100, 100], [0, 100]];

let polygonPoints = new PP(vertexes);

console.time('test 1');

assert(polygonPoints.pointsLength() === 10000);

assert(polygonPoints.containsPoint([0, 0]) === true);

assert(polygonPoints.containsPoint([10, 10]) === true);

assert(polygonPoints.containsPoint([101, 0]) === false);

assert(polygonPoints.boundingBox()[3][0] === 100);

console.timeEnd('test 1');

/*****************************************************************/

vertexes = [[0, 0], [100, 0], [50, 50]];

polygonPoints = new PP(vertexes);

console.time('test 2');

assert(polygonPoints.pointsLength() === 2550);

assert(polygonPoints.containsPoint([0, 0]) === true);

assert(polygonPoints.containsPoint([10, 10]) === true);

assert(polygonPoints.containsPoint([101, 0]) === false);

assert(polygonPoints.boundingBox()[2][1] === 50);

console.timeEnd('test 2');

/*****************************************************************/

vertexes = [[0, 0], [100, 0], [100, 100], [0, 100], [50, 50]];

polygonPoints = new PP(vertexes);

console.time('test 3');

assert(polygonPoints.pointsLength() === 7500);

assert(polygonPoints.containsPoint([0, 0]) === true);

assert(polygonPoints.containsPoint([10, 10]) === true);

assert(polygonPoints.containsPoint([101, 0]) === false);

assert(polygonPoints.boundingBox()[2][1] === 100);

console.timeEnd('test 3');

/*****************************************************************/

vertexes = [[0, 0], [100, 0], [100, 100], [0, 100], [50, 150]];

polygonPoints = new PP(vertexes);

console.time('test 4');

assert(polygonPoints.pointsLength() === 9184);

assert(polygonPoints.containsPoint([0, 0]) === true);

assert(polygonPoints.containsPoint([10, 10]) === true);

assert(polygonPoints.containsPoint([101, 0]) === false);

assert(polygonPoints.boundingBox()[2][1] === 150);

console.timeEnd('test 4');

/*****************************************************************/

console.timeEnd('complete');