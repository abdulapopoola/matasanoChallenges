'use strict';

function getBytesFromHexString(hex) {
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

function XOR(byte1, byte2) {
    let hexBytes = getBytesFromHexString(byte1);
    let xorBytes = getBytesFromHexString(byte2);

    let hexBytesLen = hexBytes.length;
    if (hexBytesLen !== xorBytes.length) {
        throw new Error('Unequal byte lengths: ' + hexBytesLen + ' : ' + byte2.length);
    }

    let xoredBytes = new Array(hexBytesLen);
    for (let i = 0; i < hexBytesLen; i++) {
        xoredBytes[i] = hexBytes[i] ^ xorBytes[i];
    }
    
    return xoredBytes.join('');
}


let hexBytes = '1c0111001f010100061a024b53535009181c';
let xorBytes = '686974207468652062756c6c277320657965';
let ans = XOR(hexBytes, xorBytes);