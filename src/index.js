'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const trackInfoParser = require('./parsers/trackInfo');

fs.readdir(path.join(os.homedir(), 'Downloads'), (err, files) => {
    if (err) {
        throw err;
    }
    console.log(files
        .map(path.parse)
        .map((fileInfo) => ({
            fileInfo,
            trackInfo: trackInfoParser(fileInfo.name)
        }))
        .map((d) => ({
            fileInfo: d.fileInfo,
            newName: JSON.stringify(d.trackInfo)
        })));
});