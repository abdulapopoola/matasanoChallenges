'use strict';
const entropy = require('entropy.js');
const helpers = require('helpers.js');
const stringMetrics = require('stringMetrics.js');

const MIN_KEY_SIZE = 2;
const MAX_KEY_SIZE = 40;

function processKeySizeBlocks(arr, startKeySize, endKeySize) {
    let results = [];
    for (let i = startKeySize; i <= endKeySize; i++) {
        let chunkedArray = chunkerize(arr, i);
        let editDistance = stringMetrics.binaryHammingDistance(chunkedArray[0], chunkedArray[1]);
        let normalizedDistance = editDistance / i;
        results.push[[normalizedDistance, i]];
    }

    function comparator(x, y) {
        //compare by lowest editDistance, then by index
        if (x[0] < y[0]) return -1;
        else if (x[0] > y[0]) return 1;
        else if (x[1] < y[1]) return -1;
        else if (x[1] > y[1]) return 1;
        else return 0;
    }

    result.sort(comparator);
    return results;
}

function chunkerize(arr, size) {
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
    return chunks.reduce((prev, curr) => {
        for (let i = 0, len = curr.length; i < len; i++) {
            if (!prev[i]) {
                prev[i] = [];
            }
            prev[i].push(curr[i]);
        }

        return prev;
    }, []);
}

function decrypt(cipher) {
    let bytes = helpers.getCharCodeArray(cipher);
    let results = processKeySizeBlocks(bytes, MIN_KEY_SIZE, MAX_KEY_SIZE);
    let bestChoice = results[0];
    let bestKeySize = bestChoice[1];
    let splitCipherText = chunkerizeCipherText(cipher, bestKeySize);
    let transposedCipherTextBlocks = transposeCipherBlocks(splitCipherText);

    let keys = [];
    for (let transposedBlock of transposedCipherTextBlocks) {
        let blockPossibilities = helpers.singleByteXORPossibilities(transposedBlock);
        let rankedIndices = entropy.decryptMany(blockPossibilities);
        let bestGuessIndex = rankedIndices[0][0];
        console.log(blockPossibilities[bestGuessIndex]);
        keys.push(bestGuessIndex);
    }

    return keys;
}

exports.decrypt = decrypt;

