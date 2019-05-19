let option = process.env.ESLINT_OPTION || 'error';

let config = {
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
    env: {
        browser: true,
        es6: true,
        commonjs: true,
    },
    rules: {
        'semi': 'error',
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'consistent-return': 'error',
        'max-classes-per-file': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-implicit-coercion': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': ['error', { 'allowLoop': true }],
        'no-label-var': 'error',
        'no-new-func': 'error',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-throw-literal': 'error',
        'no-floating-decimal': 'error',
        'no-use-before-define': 'error',
        'no-useless-catch': 'error',
        'radix': 'error',
        'complexity': [option, 15],
        'no-alert': option,
        'no-console': option,
        'dot-location': [option, 'property'],
        'dot-notation': option,
        'no-else-return': option,
        'no-extra-parens': option,
        'no-lone-blocks': option,
        'no-magic-numbers': [option, { 'ignore': [-1, 0, 0.5, 1, 2, 3, 10], 'ignoreArrayIndexes': true, 'detectObjects': true }],
        'no-multi-spaces': option,
        'no-useless-concat': option,
        'no-useless-return': option,
        'no-warning-comments': option,
        'prefer-named-capture-group': option,
        'no-cond-assign': 'off',

        'require-jsdoc': ['warn', {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: true,
                ArrowFunctionExpression: false,
                FunctionExpression: false
            }
        }],
        'jsdoc/check-alignment': 1,
        'jsdoc/check-examples': 1,
        'jsdoc/check-indentation': 1,
        'jsdoc/check-param-names': 1,
        'jsdoc/check-syntax': 1,
        'jsdoc/check-tag-names': 1,
        'jsdoc/check-types': 1,
        'jsdoc/no-undefined-types': 1,
        'jsdoc/require-hyphen-before-param-description': 1,
        'jsdoc/require-param': 1,
        'jsdoc/require-param-description': 1,
        'jsdoc/require-param-name': 1,
        'jsdoc/require-param-type': 1,
        'jsdoc/require-returns': 1,
        'jsdoc/require-returns-check': 1,
        'jsdoc/require-returns-description': 1,
        'jsdoc/require-returns-type': 1,
        'jsdoc/valid-types': 1,
    },
    settings: {
        jsdoc: {
            tagNamePreference:
            {
                returns: 'return',
            }
        }
    }

};

//if (option == 'error')
config.plugins = ['jsdoc'];

module.exports = config;
