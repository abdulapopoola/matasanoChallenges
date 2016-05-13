'use strict';

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

exports.hamming = hamming;
