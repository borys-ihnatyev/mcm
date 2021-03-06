'use strict';

const settings = require('../../settings');
const titleSeparators = settings.get('dictionary/titleSeparators');
const variationSeparators = settings.get('dictionary/variationSeparators');

const escapeRegExp = require('escape-string-regexp');
const normalize = require('./normalize');
const parseArtists = require('./parseArtists');
const titleParse = require('./parseTitle');
const parseVariation = require('./parseVariation');

module.exports = function parseTrackInfo(rawValue) {
    let extracted = normalize(rawValue);

    const artists = extractArtists(extracted);
    extracted = artists.extracted;

    const variation = extractVariation(extracted);
    extracted = variation.extracted;

    const title = titleParse(extracted);

    return {
        artists: artists.artists.concat(title.artists),
        title: title.title,
        variation: variation.variation
    };
};

function extractArtists(rawValue) {
    return ifExists(firstUsedToken(rawValue, ...titleSeparators),
        (token) => ({
            artists: parseArtists(beforeToken(rawValue, token)),
            extracted: afterToken(rawValue, token)
        }),
        () => ({
            artists: [],
            extracted: rawValue
        })
    );
}

function extractVariation(rawValue) {
    return ifExists(firstUsedToken(rawValue, ...variationSeparators.start),
        (token) => ({
            variation: parseVariation(removeTokens(
                afterToken(rawValue, token),
                ...variationSeparators.start,
                ...variationSeparators.end
            )),
            extracted: beforeToken(rawValue, token)
        }),
        () => ({
            extracted: rawValue
        })
    );
}

function ifExists(value, onTrue, onFalse) {
    return value ? onTrue(value) : onFalse();
}

function firstUsedToken(value, ...tokens) {
    const indexes = tokens
        .map(token => ({
            token,
            index: value.indexOf(token)
        }))
        .filter(i => i.index > -1);

    return indexes.sort((a, b) => a.index - b.index)[0];
}

function beforeToken(value, token) {
    return value.substr(0, token.index);
}

function afterToken(value, token) {
    return value.substr(token.index + token.token.length);
}

function removeTokens(value, ...tokens) {
    const tokensRx = new RegExp(
        `(${tokens.map(escapeRegExp).join('|')})`,
        'g'
    );
    return value.replace(tokensRx, '');
}
