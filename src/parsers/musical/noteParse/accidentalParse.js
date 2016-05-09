'use strict';

const accidentals = require('../../../model/accidentals');
const settings = require('../../../settings');
const dictionaryParser = require('../../core/dictionaryParser');

module.exports = dictionaryParser(accidentals, settings.get('dictionary/accidentals'));
