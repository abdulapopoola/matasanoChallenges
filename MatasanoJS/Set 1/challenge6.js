'use strict';
const helpers = require('../Utils/helpers.js');
const stringMetrics = require('../Utils/stringMetrics.js');

const test1 = `this is a test`;
const test2 = 'wokka wokka!!!';

let str1CharCodeArray = helpers.getCharCodeArray(test1);
let str2CharCodeArray = helpers.getCharCodeArray(test2);
let distance = stringMetrics.binaryHammingDistance(str1CharCodeArray, str2CharCodeArray);
helpers.checkSuccess(37, distance);

const MIN_KEYSIZE = 2;
const MAX_KEYSIZE = 40;

function findBestKey() {
    
}

//decrypt file -> convert from base64
//write function to read file into some storage
//write function to solve stage 3, picking up keysizes of each byte, finding edit distance and normalizing
//