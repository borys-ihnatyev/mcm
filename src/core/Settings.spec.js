'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('core/Settings', () => {
    const settingsBasePath = '/settings';
    const mySettingProp = 'mySetting';
    const mySetting = {};

    let sut;

    beforeEach(() => {
        const Settings = proxyquire('./Settings', {
            [`${settingsBasePath}/${mySettingProp}`]: mySetting
        });
        sut = new Settings(settingsBasePath);
    });

    it('should read property as file from base path', () => {
        sut.get(mySettingProp).should.equal(mySetting);
    });

});
