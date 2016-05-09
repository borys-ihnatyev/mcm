'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('parsers/toneParse', () => {
    let sut;
    let dictionaryParser;
    let parseFn;

    const tones = {};
    const tonesDictionary = {};
    let settings;

    beforeEach(() => {
        parseFn = env.stub();
        dictionaryParser = env.stub().returns(parseFn);
        settings = {
            get: env.stub()
        };

        settings.get.withArgs('dictionary/tones').returns(tonesDictionary);

        sut = proxyquire('./toneParse', {
            '../../model/tones': tones,
            '../../settings': settings,
            '../core/dictionaryParser': dictionaryParser
        });
    });

    it('should use tones with tones dictionary', () => {
        dictionaryParser.should
            .calledOnce
            .and
            .calledWith(
                sinon.match.same(tones),
                sinon.match.same(tonesDictionary)
            );
    });

    it('should be parse function', () => {
        sut.should.equal(parseFn);
    });

});
