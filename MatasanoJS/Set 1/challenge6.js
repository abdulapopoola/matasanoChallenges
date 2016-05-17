'use strict';
const helpers = require('../Utils/helpers.js');
const stringMetrics = require('../Utils/stringMetrics.js');

const test1 = `this is a test`;
const test2 = 'wokka wokka!!!';

let distance = stringMetrics.binaryHammingDistance(test1, test2);
helpers.checkSuccess(37, distance);

//convert output to binary values
//count number of ones in output for hamming distance
