'use strict';

module.exports = function dictionaryParser(meanings, meaningDictionaries) {

    const wordMeanings = getWordMeanings(meanings, meaningDictionaries);

    return parse;

    function parse(value) {
        const firstChar = String(value).toLowerCase();

        const wordMeaning = wordMeanings.find(wm => {
            if (wm.word.length > 0) {
                return firstChar.startsWith(wm.word);
            }
            return wm.word === firstChar;
        });

        let result = null;

        if (wordMeaning) {
            result = {
                match: wordMeaning.word,
                value: wordMeaning.meaning
            };
        }

        return result;
    }
};

function getWordMeanings(meanings, meaningDictionaries) {

    return Object.keys(meaningDictionaries)
        .reduce((wordMeanings, key) => {
            const dictionary = meaningDictionaries[key];
            return wordMeanings.concat(dictionary.map(word => ({
                word,
                meaning: meanings[key]
            })));
        }, [])
        .sort((a, b) => a.word.length < b.word.length);
}
