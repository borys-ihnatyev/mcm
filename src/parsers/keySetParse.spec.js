'use strict';

const proxyquire = require('proxyquire');

describe('parsers/keySetParser', () => {
    let sut,
        keyParse;

    beforeEach(() => {
        keyParse = env.stub();
        sut = proxyquire('./keySetParse', {
            './musical/keyParse': keyParse
        });
    });

    it('should parse each value as key separated by space', () => {
        sut('ab bc');
        keyParse.should.been
            .calledWith('ab')
            .and
            .calledWith('bc');
    });

    it('should return array of parsed keys', () => {
        const parsedKey1 = 1;
        const parsedKey2 = 2;
        keyParse.onCall(0).returns(parsedKey1);
        keyParse.onCall(1).returns(parsedKey2);
        sut('a b').should.eql([parsedKey1, parsedKey2]);
    });

    it('should not include invalid keys', () => {
        const parsedKey1 = 1;
        keyParse.onCall(0).returns(parsedKey1);
        keyParse.onCall(1).returns();
        sut('a b').should.eql([parsedKey1]);
    });

    it('should return empty array when parse empty string', () => {
        sut('').should.eql([]);
    });

    it('should return empty array on empty result set', () => {
        sut().should.eql([]);
    });

});
