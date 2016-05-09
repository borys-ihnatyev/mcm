'use strict';

module.exports = function mapReplace(string) {
    return (...rules) => rules.reduce(
        (result, rule) => result.replace(rule[0], rule[1]),
        string
    );
};
