'use strict';

const path = require('path');


class Settings {
    constructor(basePath) {
        this.basePath = basePath;
    }

    get(name) {
        /* eslint-disable global-require */
        return require(path.join(this.basePath, name));
    }

}

module.exports = Settings;
