'use strict';

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

function getHexStringForByteValuesArray(byteValuesArray) {
    //returns hex string for bytes values e.g. [255, 255] would be converted into 'FFFF'
    let hexValues = byteValuesArray.map(byteVal => (byteVal).toString(16));
    return hexValues.join('');
}

function XOR(byteArray1, byteArray2) {
    let byteArray1Len = byteArray1.length;
    if (byteArray1Len !== byteArray2.length) {
        throw new Error('Unequal byte lengths: ' + byteArray1Len + ' : ' + byteArray2.length);
    }

    let xoredBytes = new Array(byteArray1Len);
    for (let i = 0; i < byteArray1Len; i++) {
        xoredBytes[i] = byteArray1[i] ^ byteArray2[i];
    }

    return xoredBytes;
}

function getASCIIStringFromHexValues(hexValues) {
    return String.fromCharCode.apply(String, hexValues).join('');
    //return hexValues.map(hexVal => String.fromCharCode(hexVal)).join('');
}

function checkSuccess(expected, actual) {
    if (expected !== actual) {
        throw new Error('Failed to give expected output. Expected: ' + expected + ' Actual: ' + actual);
    }
    console.log('GREAT JOB!!!');
}

function getAllPossible() {
    let byteArray1 = getByteValuesFromHexString('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
    let byteArrLen = byteArray1.length;

    let possibilities = [];
    for (let i = 0; i < 256; i++) {
        let xorByteArr = new Array(byteArrLen);
        xorByteArr.fill(i);
        let xoredValues = XOR(byteArray1, xorByteArr);
        let string = getASCIIStringFromHexValues(xoredValues);
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
    
    if(nonAlphabetical > (len / 2)){
        return Infinity; //Mostly gibberish that might skew the entropy values
    }
    return -(sum / (len - nonAlphabetical));
}

function decrypt() {
    let normalizedFreqs = values(UNIGRAM_FREQUENCIES).map(freq => freq / 100);

    let possibilities = getAllPossible();
    let entropies = [];
    for (let i = 0, len = possibilities.length; i < len; i++) {
        let entropy = crossEntropy(possibilities[i], normalizedFreqs);
        entropies.push([i, entropy]);
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

function values(obj){
    return Object.keys(obj).map(key => obj[key]);
}

decrypt();