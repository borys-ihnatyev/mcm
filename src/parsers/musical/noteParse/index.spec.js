'use strict';

const proxyquire = require('proxyquire');

describe('parsers/musical/noteParse', () => {
    let sut,
        noteNameParse,
        accidentalParse;

    beforeEach(() => {
        noteNameParse = env.stub();
        accidentalParse = env.stub();
        sut = proxyquire('./index', {
            './noteNameParse': noteNameParse,
            './accidentalParse': accidentalParse
        });
    });

    it('should not parse when invalid note', () => {
        should.equal(sut(''), null);
    });

});
