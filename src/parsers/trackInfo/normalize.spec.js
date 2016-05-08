'use strict';

const proxyquire = require('proxyquire');

describe('parsers/trackInfo/normalize', () => {
    let sut,
        transliteration;

    beforeEach(() => {
        transliteration = env.stub().returnsArg(0);
        sut = proxyquire('./normalize', {
            transliteration
        });
    });

    it('should transliterate passed value', () => {
        sut('123');

        transliteration.should.been
            .calledWith('123')
            .and
            .callCount(1);
    });

    it('should replace down slashes with spaces', () => {
        sut('1_2_3').should.equal('1 2 3');
    });

    it('should remove extra spaces', () => {
        sut(' 1 2__ -  3 ___').should.equal('1 2 - 3');
    });

    it('should remove extra web addresses', () => {
        sut(' 1 2__ -  3 https://vkont.com/index.html ___').should.equal('1 2 - 3');
    });

    it('should lowercase', () => {
        sut('1 __ 2 - LoWeR ').should.equal('1 2 - lower');
    });

    it('should return normalized value', () => {
        sut('123').should.equal('123');
    });

});
