'use strict';

const transliterate = require('transliteration');

const doubleSpacesAndDownSlashesRX = /[\s\s,_]+/g;
const webAddressesRX = /(?:https?|ftp):\/\/[\n\S]+/g;
const space = ' ';
const empty = '';

module.exports = function normalize(value) {
    return String(transliterate(value))
        .toLowerCase()
        .replace(doubleSpacesAndDownSlashesRX, space)
        .replace(webAddressesRX, empty)
        .trim();
};
