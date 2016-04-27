'use strict';
const entropy = require('../Utils/entropy.js');
const helpers = require('../Utils/helpers.js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let filePath = path.join(__dirname, 'files/4.txt');

const rl = readline.createInterface({
    input: fs.createReadStream(filePath)
});

let strs = [];
rl.on('line', (line) => {
    //console.log('Line from file:', line);
    strs.push(line);
});

rl.on('close', (line) => {
    console.log(entropy.decryptMany(strs));
});

//console.log(entropy.decryptMany(strs));
//Need to read file
//Decrypt each; use a big entropy bag
//Grab the best one
