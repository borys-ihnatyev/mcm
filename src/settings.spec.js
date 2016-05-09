'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('settings', () => {
    let sut,
        Settings,
        path;

    const settingsPath = Symbol('settings');

    beforeEach(() => {
        Settings = env.stub();

        path = {
            join: env.stub()
        };

        path.join.withArgs(__dirname, '..', 'settings').returns(settingsPath);

        sut = proxyquire('./settings', {
            './core/Settings': Settings,
            path
        });
    });

    it('should create settings for app', () => {
        sut.should.be.instanceOf(Settings);
    });

    it('should use settings from settings', () => {
        Settings.should.been
            .calledWithNew
            .and
            .calledWith(settingsPath)
            .and
            .callCount(1);
    });

});
