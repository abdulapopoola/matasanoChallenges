'use strict';
const entropy = require('../Utils/entropy.js');
const helpers = require('../Utils/helpers.js');

let output = entropy.decrypt('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
console.log(output);
//helpers.checkSuccess("Cooking MC's like a pound of bacon", output);
