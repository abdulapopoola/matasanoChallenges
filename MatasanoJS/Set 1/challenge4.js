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
rl.on('line', line => strs.push(line));

rl.on('close', (line) => {
    let allPossibilities = [];
    
    for(let str of strs){
        allPossibilities = allPossibilities.concat(...helpers.singleByteXORPossibilities(str));
    }
    
    let rankedIndices = entropy.decryptMany(allPossibilities);
    let bestGuessIndex = rankedIndices[0][0];
    let output = allPossibilities[bestGuessIndex];
    helpers.checkSuccess('Now that the party is jumping\n', output);
});
