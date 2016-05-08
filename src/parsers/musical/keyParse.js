'use strict';

const noteParse = require('./noteParse');
const toneParse = require('./toneParse');

module.exports = function keyParse(value) {
    let extracted = value.trim();
    const noteMatch = noteParse(extracted);

    if (!noteMatch) {
        return null;
    }

    extracted = extracted.substring(noteMatch.match.length);

    const toneMatch = toneParse(extracted);

    if (!toneMatch) {
        return null;
    }

    return {
        note: noteMatch.value,
        tone: toneMatch.value
    };
};
