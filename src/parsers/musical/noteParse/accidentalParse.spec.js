'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('parsers/accidentalParse', () => {
    let sut;
    let dictionaryParser;
    let parseFn;
    let settings;

    const accidentals = Symbol('accidentals');
    const accidentalsDictionary = Symbol('accidentalsDic');

    beforeEach(() => {
        parseFn = env.stub();
        dictionaryParser = env.stub().returns(parseFn);
        settings = {
            get: env.stub()
        };

        settings.get.withArgs('dictionary/accidentals').returns(accidentalsDictionary);

        sut = proxyquire('./accidentalParse', {
            '../../../model/accidentals': accidentals,
            '../../../settings': settings,
            '../../core/dictionaryParser': dictionaryParser
        });
    });

    it('should use accidentals with accidentals dictionary', () => {
        dictionaryParser.should
            .calledOnce
            .and
            .calledWith(
                accidentals,
                accidentalsDictionary
            );
    });

    it('should be parse function', () => {
        sut.should.equal(parseFn);
    });

});
