'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('parsers/trackInfo parseArtists', () => {
    let sut;
    
    const artistsSeparators = [
        '1',
        '2',
        '33'
    ];
    
    beforeEach(() => {
        const settings = {
            get: env.stub().withArgs('dictionary/artistsSeparators').returns(artistsSeparators)
        };
        sut = proxyquire('./parseArtists', {
            '../../settings': settings
        });
    });

    it('should split by one separator', () => {
        sut('a 1 b').should.eqls(['a', 'b']);
    });

    it('should split by multiple separators', () => {
        sut('a 1 b 2 c33d').should.eqls(['a', 'b', 'c', 'd']);
    });
    
});
