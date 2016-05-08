'use strict';

const proxyquire = require('proxyquire');

describe('parsers/keyParse', () => {
    let sut;

    beforeEach(() => {
        sut = proxyquire('./keyParse', {});
    });

    it('should be function', () => {
        sut.should.be.a('Function');
    });

});
