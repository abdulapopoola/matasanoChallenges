'use strict';
const fs = require('fs');

function readFileSync(path) {
    return fs.readFileSync(path).toString();
}

exports.readFileSync = readFileSync;
