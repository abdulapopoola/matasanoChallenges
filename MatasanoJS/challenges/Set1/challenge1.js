'use strict';
const helpers = require('../Utils/helpers.js');

let hexBytes = helpers.getByteValuesFromHexString('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d');
let hexChars = String.fromCharCode.apply(String, hexBytes);
let encoded = helpers.btoa(hexBytes);
helpers.checkSuccess('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t', encoded);