'use strict';

const noteNameParse = require('./noteNameParse');
const accidentalParse = require('./accidentalParse');

module.exports = function noteParse(value) {
    let extracted = String(value).trim();

    const noteMatch = noteNameParse(extracted);

    if (!noteMatch) {
        return null;
    }

    extracted = extracted.substring(noteMatch.match.length);

    let accidentalMatch = accidentalParse(extracted);

    if (!accidentalMatch) {
        accidentalMatch = {
            match: ''
        };
    }

    return {
        value: {
            note: noteMatch.value,
            accidental: accidentalMatch.value
        },
        match: noteMatch.match + accidentalMatch.match
    };
};
