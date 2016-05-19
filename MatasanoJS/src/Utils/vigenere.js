'use strict';

function extractKeysizeBlocks(blockSize) {

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

exports.chunk = chunk;
//write function to solve stage 3, picking up keysizes of each byte, finding edit distance and normalizing
//