'use strict';

const sut = require('./noteNameParse');

describe('parsers/musical/note/noteNameParse', () => {

    const validNoteName = 'A';
    const invalidNoteName = 'u';

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
