'use strict';

const tones = require('../../model/tones');
const tonesDictionary = require('../../../dictionary/tones.json');
const dictionaryParser = require('../core/dictionaryParser');

module.exports = dictionaryParser(tones, tonesDictionary);
