'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('parsers/musical/note/noteNameParse', () => {

    const validNoteName = 'K';
    const invalidNoteName = 'A';

    let sut;
    let settings;

    const notesDictionary = [
        validNoteName
    ];

    beforeEach(() => {

        settings = {
            get: env.stub().withArgs('notes').returns(notesDictionary)
        };

        sut = proxyquire('./noteNameParse', {
            '../../../settings': settings
        });
    });

    describe('parsing', () => {

        it('should not parse invalid note', () => {
            should.equal(sut(invalidNoteName), null);
        });

        it('should not parse when value is undefined', () => {
            should.equal(sut(), null);
        });

        context('when valid note', () => {

            it('should parse valid note in upper case', () => {
                sut(validNoteName).value.should.equal(validNoteName);
            });

            it('should parse valid note in lower case', () => {
                sut(validNoteName.toLowerCase()).value.should.equal(validNoteName);
            });

            it('should parse note with extra information', () => {
                sut(`${validNoteName}moll`).value.should.equal(validNoteName);
            });
        });

    });

});
