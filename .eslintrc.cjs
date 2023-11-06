module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:import/recommended",
        "prettier",
        "airbnb",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    plugins: ["react-refresh", "react-hooks"],
    settings: {
        "import/resolver": {
            "eslint-import-resolver-custom-alias": {
                alias: {
                    "@": "./src/",
                    src: "./src/",
                    components: "./src/components",
                    utils: "./src/utils",
                    data: "./src/data",
                    hooks: "./src/hooks",
                    contexts: "./src/contexts",
                },
                extensions: [".js", ".jsx"],
            },
        },
        react: { version: "18.2" },
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-unused-vars": "off",
        "react/prop-types": "off",
        "no-prototype-builtins": "off",
        "react/display-name": "off",
        "no-inner-declarations": "off",
        "import/no-unresolved": [
            2,
            {
                commonjs: true,
                amd: true,
            },
        ],
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "testing-library/no-debugging-utils": [
            "warn",
            {
                utilsToCheckFor: {
                    debug: false,
                    logRoles: true,
                    logDOM: true,
                },
            },
        ],
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
    globals: {
        vi: true,
    },
    overrides: [
        {
            files: ["*.test.js"],
            extends: ["plugin:testing-library/react"],
        },
    ],
};
