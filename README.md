# polygon-points
###### [![Build Status](https://travis-ci.org/kevinGodell/polygon-points.svg?branch=master)](https://travis-ci.org/kevinGodell/polygon-points) [![GitHub issues](https://img.shields.io/github/issues/kevinGodell/polygon-points.svg)](https://github.com/kevinGodell/polygon-points/issues) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kevinGodell/polygon-points/master/LICENSE)
Determine if an x y coordinate exists in a polygon. This is being used in a motion detection project where specific regions of an image are being filtered and measured. It works fast when iterating pixels because it caches the bounding box value and uses it to quickly eliminate non-targeted pixels from unnecessary difference calculations. It is designed to be used with positive integer values starting with an x y value of 0 0 at the top left.
### installation:
``` 
npm install polygon-points --save
```
### usage:
```
const PP = require('polygon-points');

const polygonPoints = new PP([{x: 0, y: 0}, {x: 0, y: 100}, {x: 100, y: 100}, {x: 100, y: 0}]);

//public methods

//check if a point exists in the polygon
polygonPoints.containsPoint({x: 1, y: 1});//returns true

//get bounding box of polygon
polygonPoints.boundingBox();//returns an array of 4 x y coordinates

//get total number of points that exist in polygon
polygonPoints.pointsLength();//returns 10000
```