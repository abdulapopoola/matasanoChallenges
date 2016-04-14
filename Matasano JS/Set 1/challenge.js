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
    for (let i = 0, j = 0; i < strLen; i += 2, j++)
    {
        let val = parseInt(hex.substr(i, 2), 16);
        bufferView[j] = val;
    }

    return bufferView;
}

var hexBytes = getBytesFromHexString('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d');