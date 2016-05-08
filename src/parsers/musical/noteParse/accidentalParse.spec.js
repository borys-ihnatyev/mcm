'use strict';

const proxyquire = require('proxyquire');

describe('parsers/accidentalParse', () => {
    let sut;
    let dictionaryParser;
    let parseFn;

    const accidentals = {};
    const accidentalsDictionary = {};

    beforeEach(() => {
        parseFn = env.stub();
        dictionaryParser = env.stub().returns(parseFn);

        sut = proxyquire('./accidentalParse', {
            '../../../model/accidentals': accidentals,
            '../../../../dictionary/accidentals.json': accidentalsDictionary,
            '../../core/dictionaryParser': dictionaryParser
        });
    });

    it('should use accidentals with accidentals dictionary', () => {
        dictionaryParser.should
            .calledOnce
            .and
            .calledWith(
                sinon.match.same(accidentals),
                sinon.match.same(accidentalsDictionary)
            );
    });

    it('should be parse function', () => {
        sut.should.equal(parseFn);
    });

});
