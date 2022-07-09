// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2022": true,
    },
    "plugins": [
        "unicorn",
        "sonarjs"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:unicorn/recommended",
        "plugin:sonarjs/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "off",
        "sonarjs/no-duplicate-string": "off",
        "unicorn/prefer-module": "off",
        "sonarjs/cognitive-complexity": "off",
        "unicorn/prefer-add-event-listener": "off",
        "semi": "always"
    }
};
