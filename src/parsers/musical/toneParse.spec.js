'use strict';

const proxyquire = require('proxyquire');

describe('parsers/toneParse', () => {
    let sut;
    let dictionaryParser;
    let parseFn;

    const tones = {};
    const tonesDictionary = {};

    beforeEach(() => {
        parseFn = env.stub();
        dictionaryParser = env.stub().returns(parseFn);

        sut = proxyquire('./toneParse', {
            '../../model/tones': tones,
            '../../../dictionary/tones.json': tonesDictionary,
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
