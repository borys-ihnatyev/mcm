'use strict';

const proxyquire = require('proxyquire');
const titleSeparator = require('../../../dictionary/titleSeparators.json')[0];
const variationSeparators = require('../../../dictionary/variationSeparators.json');

describe('parsers/trackInfo/trackInfoParse', () => {
    let sut,
        normalize,
        parseArtists,
        parseTitle,
        parseVariation;

    let value,
        result;

    const artists = [1, 2, 3];

    const title = {
        title: 'TITLE',
        artists: [4, 5, 6]
    };

    const variation = {};

    beforeEach(() => {
        normalize = env.stub().returnsArg(0);
        parseArtists = env.stub().returns(artists);
        parseTitle = env.stub().returns(title);
        parseVariation = env.stub().returns(variation);

        sut = proxyquire('./index', {
            './normalize': normalize,
            './parseArtists': parseArtists,
            './parseTitle': parseTitle,
            './parseVariation': parseVariation
        });
    });

    it('should normalize track name', () => {
        value = '1';
        sut(value);
        normalize.should.been.calledWith(value);
    });

    context('when artists title separator exists', () => {

        const artistsString = 'ARTIST';
        const titleString = 'TITLE';

        beforeEach(() => {
            value = `${artistsString}${titleSeparator}${titleString}`;
            result = sut(value);
        });

        it('should split on first artists title separator and parse artists', () => {
            parseArtists.should.been.calledWith(artistsString);
        });

        it('should include artists', () => {
            result.artists.should.include.members(artists);
        });

        it('should parse title from left info', () => {
            parseTitle.should.been.calledWith(titleString);
        });

        it('should include title artists', () => {
            result.artists.should.include.members(title.artists);
        });

        it('should include title', () => {
            result.title.should.equal(title.title);
        });
    });

    context('when artists title separator missed', () => {

        const titleString = 'TITLE';

        beforeEach(() => {
            value = `${titleString}`;
            result = sut(value);
        });

        it('should not parse artisits', () => {
            parseArtists.should.have.callCount(0);
        });

        it('should include title artists', () => {
            result.artists.should.include.members(title.artists);
        });

        it('should include title', () => {
            result.title.should.equal(title.title);
        });

    });

    context('when variation separator exists', () => {
        const artistsString = 'ARTIST';
        const titleString = 'TITLE';
        const variationString = 'VARIATION';

        beforeEach(() => {
            value = `${artistsString}${titleSeparator}${titleString}`
            + `${variationSeparators.start[0]}`
            + `${variationString}`
            + `${variationSeparators.end[0]}`;
            result = sut(value);
        });

        it('should parse variation', () => {
            parseVariation.should.been.calledWith(variationString);
        });

        it('should include variation', () => {
            result.variation.should.equal(variation);
        });

    });

});
