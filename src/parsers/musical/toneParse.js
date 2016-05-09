'use strict';

const tones = require('../../model/tones');
const settings = require('../../settings');
const dictionaryParser = require('../core/dictionaryParser');

module.exports = dictionaryParser(tones, settings.get('dictionary/tones'));
