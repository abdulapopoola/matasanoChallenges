'use strict';

function getHexValuesFromString(str) {
    return str.split('').map((char) => char.charCodeAt(0));
}

function getByteValuesFromHexString(hex) {
    //returns integer values for bytes e.g. FF would be converted to 255
    const HEX_CHAR_LEN = 2; //hex strings are 2 chars long each
    if (hex.length % 2 != 0) {
        throw new Error('Badly formed hex string: ' + hex);
    }

    let strLen = hex.length;
    let bufferLen = strLen / HEX_CHAR_LEN;
    let buffer = new ArrayBuffer(bufferLen);
    let bufferView = new Uint8ClampedArray(buffer);
    for (let i = 0, j = 0; i < strLen; i += 2, j++) {
        let val = parseInt(hex.substr(i, 2), 16);
        bufferView[j] = val;
    }

    return bufferView;
}

function repeatingXOR(byteArray1, byteArray2) {
    let byteArray1Len = byteArray1.length;
    let byteArray2Len = byteArray2.length;

    let xoredBytes = new Array(byteArray1Len);
    for (let i = 0; i < byteArray1Len; i++) {
        let xorByteIndex = i % byteArray2Len;
        xoredBytes[i] = byteArray1[i] ^ byteArray2[xorByteIndex];
    }

    return xoredBytes;
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

function checkSuccess(expected, actual) {
    if (expected !== actual) {
        throw new Error('Failed to give expected output. Expected: ' + expected + ' Actual: ' + actual);
    }
    console.log('GREAT JOB!!!');
}

function bufferToBase64(buffer) {
    let binaryStr = String.fromCharCode.apply(String, buffer);
    return btoa(binaryStr);
}

function getHexStringForByteValuesArray(byteValuesArray) {
    //returns hex string for bytes values e.g. [255, 255] would be converted into 'FFFF'
    let hexValues = byteValuesArray.map(byteVal => {
        let val = (byteVal).toString(16);
        if (val.length === 1) {
            val = '0' + val; //pad with leading 0
        }

        return val;
    });
    return hexValues.join('');
}

function getASCIIStringFromHexValues(hexValues) {
    return String.fromCharCode.apply(String, hexValues);
}

function values(obj) {
    return Object.keys(obj).map(key => obj[key]);
}

function btoa(str) {
    if (typeof window !== 'undefined' && window.btoa) {
        return window.btoa(str);
    }
    return new Buffer(str).toString('base64');
}

function singleByteXORPossibilities(str) {
    let byteArray1 = getByteValuesFromHexString(str);
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

exports.XOR = XOR;
exports.getByteValuesFromHexString = getByteValuesFromHexString;
exports.checkSuccess = checkSuccess;
exports.getHexStringForByteValuesArray = getHexStringForByteValuesArray;
exports.bufferToBase64 = bufferToBase64;
exports.getASCIIStringFromHexValues = getASCIIStringFromHexValues;
exports.values = values;
exports.singleByteXORPossibilities = singleByteXORPossibilities;
exports.repeatingXOR = repeatingXOR;
exports.getHexValuesFromString = getHexValuesFromString;
//Split into two files? Hex, xor utilities + result verifier?
