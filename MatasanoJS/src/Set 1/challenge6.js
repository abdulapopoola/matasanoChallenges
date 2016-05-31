'use strict';
const entropy = require('../Utils/entropy.js');
const file = require('../Utils/file.js');
const helpers = require('../Utils/helpers.js');
const path = require('path');
const stringMetrics = require('../Utils/stringMetrics.js');
const vigenere = require('../Utils/vigenere.js');

// const test1 = `this is a test`;
// const test2 = 'wokka wokka!!!';
// let str1CharCodeArray = helpers.getCharCodeArray(test1);
// let str2CharCodeArray = helpers.getCharCodeArray(test2);
// let distance = stringMetrics.binaryHammingDistance(str1CharCodeArray, str2CharCodeArray);
// helpers.checkSuccess(37, distance);

let filePath = path.join(__dirname, 'files/6.txt');
let contents = file.readFileSync(filePath);
let decodedContent = helpers.atob(contents);

const MIN_KEYSIZE = 2;
const MAX_KEYSIZE = 40;

let output = vigenere.decrypt(decodedContent);
console.log(output);

let decrypted = helpers.getASCIIStringFromHexValues(output);
console.log(decrypted);

// let test = helpers.getCharCodeArray('KGFQLMG');
// let joinedBlock = helpers.getHexStringForByteValuesArray(test);
// let blockPossibilities = helpers.singleByteXORPossibilities(joinedBlock);
// let rankedIndices = entropy.decryptMany(blockPossibilities);
// let bestGuessIndex = rankedIndices[0][0];
// console.log(bestGuessIndex);

//decrypt file -> convert from base64
//write function to read file into some storage
//write function to solve stage 3, picking up keysizes of each byte, finding edit distance and normalizing
//