'use strict';
const helpers = require('../Utils/helpers.js');
const stringMetrics = require('../Utils/stringMetrics.js');

const test = `this is a test`;
const key = 'wokka wokka!!!';

let output = stringMetrics.binaryHammingDistance(test, key);

//convert output to binary values
//count number of ones in output for hamming distance
console.log(output);
