'use strict';

console.time('complete');

const assert = require('assert');

const PP = require('../index');

/*****************************************************************/

console.time('test 1');

let vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}];

let polygonPoints = new PP(vertexes);

assert(polygonPoints.pointsLength === 10201);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(0, 100) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(100, 0) === true);

assert(polygonPoints.containsPoint(100, 100) === true);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.containsPoint(0, 101) === false);

assert(polygonPoints.boundingBox[3].x === 0);

assert(polygonPoints.boundingBox[3].y === 100);

assert(polygonPoints.minX === 0);

assert(polygonPoints.maxX === 100);

assert(polygonPoints.minY === 0);

assert(polygonPoints.maxY === 100);

let bitset = polygonPoints.getBitset(120, 120);

let buffer = bitset.buffer;

let count = bitset.count;

let length = bitset.length;

let counter = 0;

for (let i = 0; i < length; i++) {
    if (buffer[i]) {
        counter++;
    }
}

assert(counter === count);

console.timeEnd('test 1');

/*****************************************************************/

console.time('test 2');

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 50, y: 50}];

polygonPoints.vertexes = vertexes;

assert(polygonPoints.pointsLength === 2599);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(100, 0) === true);

assert(polygonPoints.containsPoint(50, 50) === true);

assert(polygonPoints.containsPoint(51, 50) === false);

assert(polygonPoints.containsPoint(50, 51) === false);

assert(polygonPoints.boundingBox[3].x === 0);

assert(polygonPoints.boundingBox[3].y === 50);

assert(polygonPoints.minX === 0);

assert(polygonPoints.maxX === 100);

assert(polygonPoints.minY === 0);

assert(polygonPoints.maxY === 50);

bitset = polygonPoints.getBitset(120, 120);

buffer = bitset.buffer;

count = bitset.count;

length = bitset.length;

counter = 0;

for (let i = 0; i < length; i++) {
    if (buffer[i]) {
        counter++;
    }
}

assert(counter === count);

console.timeEnd('test 2');

/*****************************************************************/

console.time('test 3');

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}, {x: 50, y: 50}];

polygonPoints.vertexes = vertexes;

assert(polygonPoints.pointsLength === 7701);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(0, 100) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(100, 0) === true);

assert(polygonPoints.containsPoint(100, 100) === true);

assert(polygonPoints.containsPoint(50, 50) === true);

assert(polygonPoints.containsPoint(51, 50) === true);

assert(polygonPoints.containsPoint(50, 49) === true);

assert(polygonPoints.containsPoint(49, 50) === false);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.containsPoint(0, 101) === false);

assert(polygonPoints.boundingBox[3].x === 0);

assert(polygonPoints.boundingBox[3].y === 100);

assert(polygonPoints.minX === 0);

assert(polygonPoints.maxX === 100);

assert(polygonPoints.minY === 0);

assert(polygonPoints.maxY === 100);

bitset = polygonPoints.getBitset(120, 120);

buffer = bitset.buffer;

count = bitset.count;

length = bitset.length;

counter = 0;

for (let i = 0; i < length; i++) {
    if (buffer[i]) {
        counter++;
    }
}

assert(counter === count);

console.timeEnd('test 3');

/*****************************************************************/

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}, {x: 50, y: 150}];

polygonPoints.vertexes = vertexes;

console.time('test 4');

assert(polygonPoints.pointsLength === 9366);

assert(polygonPoints.containsPoint(0, 0) === true);

assert(polygonPoints.containsPoint(10, 10) === true);

assert(polygonPoints.containsPoint(100, 0) === true);

assert(polygonPoints.containsPoint(50, 150) === true);

assert(polygonPoints.boundingBox[3].x === 0);

assert(polygonPoints.boundingBox[3].y === 150);

assert(polygonPoints.minX === 0);

assert(polygonPoints.maxX === 100);

assert(polygonPoints.minY === 0);

assert(polygonPoints.maxY === 150);

bitset = polygonPoints.getBitset(120, 120);

buffer = bitset.buffer;

count = bitset.count;

length = bitset.length;

counter = 0;

for (let i = 0; i < length; i++) {
    if (buffer[i]) {
        counter++;
    }
}

assert(counter === count);

console.timeEnd('test 4');

/*****************************************************************/

vertexes = [{x: 50, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 50, y: 100}, {x: 75, y: 75}];

polygonPoints.vertexes = vertexes;

console.time('test 5');

assert(polygonPoints.pointsLength === 3876);

assert(polygonPoints.containsPoint(0, 0) === false);

assert(polygonPoints.containsPoint(10, 10) === false);

assert(polygonPoints.containsPoint(101, 0) === false);

assert(polygonPoints.boundingBox[2].y === 100);

bitset = polygonPoints.getBitset(120, 120);

buffer = bitset.buffer;

count = bitset.count;

length = bitset.length;

counter = 0;

for (let i = 0; i < length; i++) {
    if (buffer[i]) {
        counter++;
    }
}

assert(counter === count);

console.timeEnd('test 5');

/*****************************************************************/

vertexes = [{x: 0, y: 0}, {x: 10, y: 0}, {x: 10, y: 10}, {x: 0, y: 10}];

polygonPoints.vertexes = vertexes;

console.time('test 6');

assert(polygonPoints.pointsLength === 121);

assert(polygonPoints.containsPoint(0, 10) === true);

bitset = polygonPoints.getBitset(100, 100);

assert(bitset.minX === 0);

assert(bitset.maxX === 10);

assert(bitset.minY === 0);

assert(bitset.maxY === 10);

console.timeEnd('test 6');

/*****************************************************************/

vertexes = [{x: 0, y: 0}, {x: 100, y: 0}, {x: 100, y: 100}, {x: 0, y: 100}];

polygonPoints.vertexes = vertexes;

console.time('test 7');

assert(polygonPoints.pointsLength === 10201);

assert(polygonPoints.containsPoint(10, 10) === true);

bitset = polygonPoints.getBitset(10, 10);// 10 === 0 - 9

assert(bitset.minX === 0);

assert(bitset.maxX === 9);

assert(bitset.minY === 0);

assert(bitset.maxY === 9);

console.timeEnd('test 7');

/*****************************************************************/

console.timeEnd('complete');

const os = require('os');
console.log('os.type():', os.type());
console.log('os.release():', os.release());
console.log('os.platform():', os.platform());
console.log('os.arch():', os.arch());
console.log('process.arch', process.arch);
console.log('process.platform', process.platform);