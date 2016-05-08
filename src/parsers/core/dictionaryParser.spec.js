'use strict';

const proxyquire = require('proxyquire');

describe('parsers/core/dictionaryParser', () => {
    let sut;

    const dictionary = {
        one: ['ab', 'a', '']
    };

    const values = {
        one: 'one'
    };

    beforeEach(() => {
        const dictionaryParser = proxyquire('./dictionaryParser', {});
        sut = dictionaryParser(values, dictionary);
    });


    describe('parsing', () => {

        it('should not parse empty value', () => {
            should.equal(sut(), null);
        });

        it('should not parse when not in dictionary', () => {
            should.equal(sut('3'), null);
        });

        context('when exists in dictionary', () => {

            const dictionaryWord = dictionary.one[1];

            it('should parse', () => {
                sut(dictionaryWord).value.should.equal(values.one);
            });

            it('should return match', () => {
                sut(dictionaryWord).match.should.equal(dictionaryWord);
            });

            it('should parse ignoring case', () => {
                sut(dictionaryWord.toUpperCase()).value.should.equal(values.one);
            });

            it('should return match ignoring case', () => {
                sut(dictionaryWord.toUpperCase()).match.should.equal(dictionaryWord);
            });

            it('should parse when starts by word', () => {
                sut(dictionaryWord.toUpperCase() + 'extra info').value.should.equal(values.one);
            });

            it('should return match when starts by word', () => {
                sut(dictionaryWord.toUpperCase() + 'extra info').match.should.equal(dictionaryWord);
            });
        });

    });

});
