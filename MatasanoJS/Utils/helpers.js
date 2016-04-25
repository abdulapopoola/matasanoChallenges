'use strict';

function getByteValuesFromHexString(hex) {
    //returns integer values for bytes e.g. FF would be converted to 255
    const HEX_CHAR_LEN = 2; //hex strings are 2 chars long each
    if (hex.length % 2 != 0) {
        throw new Error("Badly formed hex string: " + hex);
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

function checkSuccess(expected, actual){
    if(expected !== actual){
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
    let hexValues = byteValuesArray.map(byteVal => (byteVal).toString(16));
    return hexValues.join('');    
}

function getASCIIStringFromHexValues(hexValues) {
    return String.fromCharCode.apply(String, hexValues).join('');
    //return hexValues.map(hexVal => String.fromCharCode(hexVal)).join('');
}

function values(obj){
    return Object.keys(obj).map(key => obj[key]);
}

exports.XOR = XOR;
exports.getByteValuesFromHexString = getByteValuesFromHexString;
exports.checkSuccess = checkSuccess;
exports.getHexStringForByteValuesArray = getHexStringForByteValuesArray;
exports.bufferToBase64 = bufferToBase64;
exports.getASCIIStringFromHexValues = getASCIIStringFromHexValues;