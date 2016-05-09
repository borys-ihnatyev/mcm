'use strict';

const transliterate = require('transliteration');
const mapReplace = require('../../util/string/mapReplace');

const doubleSpacesAndDownSlashesRX = /[\s\s,_]+/g;
const webAddressesRX = /(?:https?|ftp):\/\/[\n\S]+/g;
const space = ' ';
const empty = '';

module.exports = function normalize(value) {
    return mapReplace(
        String(transliterate(value))
    )(
        [doubleSpacesAndDownSlashesRX, space],
        [webAddressesRX, empty]
    ).trim().toLowerCase();
};
