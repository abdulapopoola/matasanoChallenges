'use strict';
const helpers = require('./helpers.js');

function hamming(str1, str2) {
    let str1Len = str1.length;
    let str2Len = str2.length;

    if (str1Len !== str2Len) {
        throw Error(`Unequal string lengths: \n${str1} \n${str2} `);
    }

    let difference = 0;
    for (let i = 0; i < str1Len; i++) {
        if (str1Len[i] !== str2Len[1]) {
            difference++;
        }
    }

    return difference;
}

function binaryHammingDistance(byteValues1, byteValues2) {
    let str1Len = byteValues1.length;
    let str2Len = byteValues2.length;

    if (str1Len !== str2Len) {
        throw Error(`Unequal string lengths: \n${byteValues1} \n${byteValues2} `);
    }

    let xoredValues = helpers.XOR(byteValues1, byteValues2);
    let binaryStrings = xoredValues.map(val => Number(val).toString(2));
    let difference = binaryStrings.reduce((prev, curr) => {
        return prev + curr.split('').reduce((prevSplit, currSplit) => {
            //less readable approach -> prev + (+curr)
            return prevSplit + parseInt(currSplit, 2);
        }, 0);
    }, 0);
    
    return difference;
}

exports.hamming = hamming;
exports.binaryHammingDistance = binaryHammingDistance;

