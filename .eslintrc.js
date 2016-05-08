module.exports = {
    extends: 'airbnb-base/legacy',
    env: {
        node: true,
        mocha: true,
        es6: true
    },
    globals: {
        env: true,
        sinon: true,
        should: true
    },
    rules: {
        indent: [2, 4],
        'max-len': [2, 120],
        'no-use-before-define': 0,
        'padded-blocks': 0,
        'one-var': 0,
        strict: 2
    }
};
