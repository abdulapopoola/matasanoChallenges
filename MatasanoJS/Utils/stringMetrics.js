'use strict';
const helpers = require('../Utils/helpers.js');

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

function binaryHammingDistance(str1, str2) {
    let str1Len = str1.length;
    let str2Len = str2.length;

    if (str1Len !== str2Len) {
        throw Error(`Unequal string lengths: \n${str1} \n${str2} `);
    }

    let difference = 0;

    let str1CharCodeArray = helpers.getCharCodeArray(str1);
    let str2CharCodeArray = helpers.getCharCodeArray(str2);
    let xoredValues = helpers.XOR(str1CharCodeArray, str2CharCodeArray);
    let binaryStrings = xoredValues.map(val => Number(val).toString(2));

    difference = binaryStrings.reduce((prev, curr) => {
        return prev += curr.split('').reduce((prevSplit, currSplit) => {
            //less readable approach -> prev + (+curr)
            return prevSplit + parseInt(curr, 2);
        }, 0);
    }, 0);

    return difference;
}

exports.hamming = hamming;
exports.binaryHammingDistance = binaryHammingDistance;
