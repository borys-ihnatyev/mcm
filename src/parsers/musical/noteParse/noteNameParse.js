'use strict';

const settings = require('../../../settings');
const notesDictionary = settings.get('dictionary/notes');

module.exports = noteNameParse;

function noteNameParse(value) {
    const firstChar = String(value).toLowerCase()[0];
    const note = notesDictionary.find(n => n.toLowerCase() === firstChar);

    let result = null;

    if (note) {
        result = {
            match: note,
            value: note
        };
    }

    return result;
}
