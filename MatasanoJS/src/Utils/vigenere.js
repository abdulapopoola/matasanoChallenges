'use strict';
const helpers = require('helpers.js');
const stringMetrics = require('stringMetrics.js');

const MIN_KEY_SIZE = 2;
const MAX_KEY_SIZE = 40;

function processKeySizeBlocks(arr) {
    let results = [];
    for (let i = MIN_KEY_SIZE; i <= MAX_KEY_SIZE; i++) {
        let chunkedArray = chunk(arr, i);
        let editDistance = stringMetrics.binaryHammingDistance(chunkedArray[0], chunkedArray[1]);
        let normalizedDistance = editDistance / i;
        results.push[[normalizedDistance, i]];
    }
    return results;
}

function chunk(arr, size) {
    let chunks = [];
    let start = 0;
    let end = start + size;
    let arrLen = arr.length;

    while (start < arrLen) {
        let chunk = arr.slice(start, end);
        chunks.push(chunk);
        start += size;
        end += size;
    }

    return chunks;
}

function chunkerizeCipherText(cipher, keySize) {
    let bytes = helpers.getCharCodeArray(cipher);
    let chunks = helpers.chunk(bytes, keySize);
    return chunks;
}

function transposeCipherBlocks(chunks) {
    //continue
}

exports.chunk = chunk;
//write function to solve stage 3, picking up keysizes of each byte, finding edit distance and normalizing
//
