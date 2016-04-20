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

function getASCIIStringFromHexValues(hexValues){
    return hexValues.map(hexVal => String.fromCharCode(hexVal)).join('');
}

function checkSuccess(expected, actual){
    if(expected !== actual){
        throw new Error('Failed to give expected output. Expected: ' + expected + ' Actual: ' + actual);
    }
    console.log('GREAT JOB!!!');
}

let byteArray1 = getByteValuesFromHexString('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
let byteArrLen = byteArray1.length;
let hexChars = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
for(let i = 0; i < 16; i++){
    let xorByteArr = new Array(byteArrLen);
    xorByteArr.fill(hexChars[i]);
    let xoredValues = XOR(byteArray1, xorByteArr);
    let string = getASCIIStringFromHexValues(xoredValues);
    console.log(string); 
}