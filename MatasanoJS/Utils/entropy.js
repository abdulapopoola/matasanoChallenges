'use strict';
const helpers = require('../Utils/helpers.js');

const UNIGRAM_FREQUENCIES = {
    a: 8.04,
    b: 1.48,
    c: 3.34,
    d: 3.82,
    e: 12.49,
    f: 2.40,
    g: 1.87,
    h: 5.05,
    i: 7.57,
    j: 0.16,
    k: 0.54,
    l: 4.07,
    m: 2.51,
    n: 7.23,
    o: 7.64,
    p: 2.14,
    q: 0.12,
    r: 6.28,
    s: 6.51,
    t: 9.28,
    u: 2.73,
    v: 1.05,
    w: 1.68,
    x: 0.23,
    y: 1.66,
    z: 0.09
};

function getAllPossible(str) {
    let byteArray1 = helpers.getByteValuesFromHexString(str);
    let byteArrLen = byteArray1.length;

    let possibilities = [];
    for (let i = 0; i < 256; i++) {
        let xorByteArr = new Array(byteArrLen);
        xorByteArr.fill(i);
        let xoredValues = helpers.XOR(byteArray1, xorByteArr);
        let string = helpers.getASCIIStringFromHexValues(xoredValues);
        possibilities.push(string);
    }

    return possibilities;
}

function crossEntropy(str, freqArr) {
    str = str.toLowerCase();
    let sum = 0;
    let nonAlphabetical = 0;
    let len = str.length;
    for (let i = 0; i < len; i++) {
        let charIndex = str.charCodeAt(i);
        if (charIndex >= 97 && charIndex <= 122) {
            var charFreq = freqArr[charIndex - 97];
            sum += log2(charFreq);
        } else {
            nonAlphabetical++;
        }
    }

    if (nonAlphabetical > (len / 2)) {
        return Infinity; //Mostly gibberish that might skew the entropy values
    }
    return -(sum / (len - nonAlphabetical));
}

function decrypt(str) {
    let normalizedFreqs = helpers.values(UNIGRAM_FREQUENCIES).map(freq => freq / 100);

    let possibilities = getAllPossible(str);
    let entropies = [];
    for (let i = 0, len = possibilities.length; i < len; i++) {
        let entropy = crossEntropy(possibilities[i], normalizedFreqs);
        entropies.push([i, entropy]);
        //console.log("Entry "+ i +" : " + entropy)
    }

    entropies.sort(function (x, y) {
        // Compare by lowest entropy, break ties by lowest shift
        if (x[1] < y[1]) return -1;
        else if (x[1] > y[1]) return 1;
        else if (x[0] < y[0]) return -1;
        else if (x[0] > y[0]) return 1;
        else return 0;
    });

    let bestAnswerIndex = entropies[0][0];
    return possibilities[bestAnswerIndex];
    //shift is also bestAnswerIndex
}

function decryptMany(strs) {
    let normalizedFreqs = helpers.values(UNIGRAM_FREQUENCIES).map(freq => freq / 100);

    let entropies = [];
    let possibilities = [];
    for (let str of strs) {
        let strPossibilities = getAllPossible(str);
        let indexCounter = 0;
        for (let i = 0, len = strPossibilities.length; i < len; i++) {
            let entropy = crossEntropy(strPossibilities[i], normalizedFreqs);
            let index = i + 256*indexCounter;
            if(entropy === Infinity){
                //continue;
            }
            //console.log("Entry "+ i +" : " + entropy);
            entropies.push([i, entropy]);
            possibilities.push(strPossibilities[i]);
        }
        indexCounter++;
    }

    console.log(possibilities.length);
    entropies.sort(function (x, y) {
        // Compare by lowest entropy, break ties by lowest shift
        if (x[1] < y[1]) return -1;
        else if (x[1] > y[1]) return 1;
        else if (x[0] < y[0]) return -1;
        else if (x[0] > y[0]) return 1;
        else return 0;
    });

    let bestAnswerIndex = entropies[0][0];
    console.log(entropies.length);
    console.log(bestAnswerIndex);
    
    for(let i=0; i < entropies.length; i++){
        var index = entropies[i][0];
        var decode = possibilities[index];
        if(!isGibberish(decode)){
            //console.log(possibilities[index]);
        }
    }
    
    return possibilities[bestAnswerIndex];
}

function isGibberish(str) {
    str = str.toLowerCase();
    let sum = 0;
    let nonAlphabetical = 0;
    let len = str.length;
    for (let i = 0; i < len; i++) {
        let charIndex = str.charCodeAt(i);
        if (charIndex >= 97 && charIndex <= 122) {
        } else {
            nonAlphabetical++;
        }
    }
    
    if(nonAlphabetical > len / 5){
        return true;
    }
    
    return false;
}

function log2(val) {
    if (Math.log2) {
        return Math.log2(val);
    } else {
        return Math.log(val) / Math.log(2);
    }
}

exports.decrypt = decrypt;
exports.decryptMany = decryptMany;
exports.isGibberish = isGibberish;