'use strict';

const keyParse = require('./musical/keyParse');

module.exports = function keySetParse(value) {
    return String(value)
        .split(' ')
        .map(keyParse)
        .filter(k => k);
};
