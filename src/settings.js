'use strict';

const Settings = require('./core/Settings');
const path = require('path');

module.exports = new Settings(path.join(__dirname, '..', 'settings'));
