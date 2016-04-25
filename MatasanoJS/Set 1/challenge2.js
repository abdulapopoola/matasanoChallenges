'use strict';
const helpers = require('../Utils/helpers.js');

let byteArray1 = helpers.getByteValuesFromHexString('1c0111001f010100061a024b53535009181c');
let xorBytes = helpers.getByteValuesFromHexString('686974207468652062756c6c277320657965');
let xoredValues = helpers.XOR(byteArray1, xorBytes);
let ans = helpers.getHexStringForByteValuesArray(xoredValues);

helpers.checkSuccess('746865206b696420646f6e277420706c6179', ans);