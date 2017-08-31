'use strict';

const regEscape = require('escape-string-regexp');
const settings = require('../../settings');
const artistsSeparators = settings.get('dictionary/artistsSeparators');

module.exports = function artistsParse(artists) {
    const pattern = `(${artistsSeparators.map(regEscape).join(',')})`;
    console.log(pattern);
    return artists.split(new RegExp(pattern,'i'))
        .map(i => i.trim())
        .filter(i => i.length);
};
