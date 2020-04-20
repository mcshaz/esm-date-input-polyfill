module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/interface-name-prefix": "off", // note deprecated in favour of below, will have to be removed @ some point
        "@typescript-eslint/naming-convention": [
            "error",
            { // Use camelCase in general
                "selector": "default",
                "format": ["camelCase"]
            },
            { // Class names in PascalCase
                "selector": "typeLike",
                "format": ["PascalCase"]
            },
            { // Enforce that private members are prefixed with an underscore
              "selector": "memberLike",
              "modifiers": ["private"],
              "format": ["camelCase"],
              "leadingUnderscore": "require"
            },
            { // Enforce that boolean variables are prefixed with an allowed verb
              "selector": "variable",
              "types": ["boolean"],
              "format": ["PascalCase"],
              "prefix": ["is", "should", "has", "can", "did", "will"]
            },
            { // Enforce that type parameters (generics) are prefixed with T then PascalCase
                "selector": "typeParameter",
                "format": ["PascalCase"],
                "prefix": ["T"]
            },
        ]
    
    }
};