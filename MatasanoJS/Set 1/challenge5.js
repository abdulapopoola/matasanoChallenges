'use strict';
const helpers = require('../Utils/helpers.js');

const stanza = `Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal`;
const key = 'ICE';

//Get each hex char
//write function to encrypt byte against byte
//output it
let charCodeArray = helpers.getCharCodeArray(stanza);
let keyCharCodeArray = helpers.getCharCodeArray(key);
let xoredBytes = helpers.repeatingXOR(charCodeArray, keyCharCodeArray);
let output = helpers.getHexStringForByteValuesArray(xoredBytes);
let expected = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f';
helpers.checkSuccess(expected, output);
