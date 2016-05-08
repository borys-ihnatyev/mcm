'use strict';

const accidentals = require('../../../model/accidentals');
const accidentalsDictionary = require('../../../../dictionary/accidentals.json');
const dictionaryParser = require('../../core/dictionaryParser');

module.exports = dictionaryParser(accidentals, accidentalsDictionary);
