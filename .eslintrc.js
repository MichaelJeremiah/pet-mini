module.exports = {
    parser: '@typescript-eslint/parser',
    root: true,
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['simple-import-sort'],
    env: {
        es6: true,
        node: true,
        commonjs: true
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint', 'eslint-plugin-promise', 'eslint-plugin-prettier', 'eslint-plugin-import']
        }
    ],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
            jsx: false
        }
    },
    globals: {
        App: true,
        Page: true,
        Component: true,
        Behavior: true,
        wx: true,
        WechatMiniprogram: true,
        getApp: true,
        getCurrentPages: true,
        NodeJS: true
    },
    rules: {
        camelcase: 'off',
        curly: 'off',
        'no-cond-assign': 'error',
        'guard-for-in': 'warn',
        'block-scoped-var': 'warn',
        'default-case': 'warn',
        'no-alert': 'error',
        'no-empty-function': 'off',
        'no-extend-native': 'error',
        semi: ['error', 'always'],
        indent: ['error', 4],
        'no-console': 'off',
        'no-global-assign': 'error',
        quotes: ['error', 'single'],
        eqeqeq: 'error',
        'block-spacing': ['error', 'always'],
        'object-curly-spacing': [
            'error',
            'always',
            {
                objectsInObjects: false
            }
        ],
        'space-unary-ops': [
            'error',
            {
                words: true,
                nonwords: false
            }
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'no-useless-escape': 'off',
        'no-nested-ternary': 'off',
        'no-multi-spaces': 'error',
        'no-undef': 'error',
        'space-before-function-paren': 'off',
        'import/no-unresolved': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'no-restricted-syntax': 'off',
        'no-return-await': 'off',
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I']
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T']
            }
        ],
        '@typescript-eslint/no-this-alias': [
            0,
            {
                allowDestructuring: true,
                allowedNames: ['self']
            }
        ],
        '@typescript-eslint/triple-slash-reference': 0,
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': [
            0,
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': true,
                'ts-nocheck': true,
                'ts-check': false,
                minimumDescriptionLength: 3
            }
        ],
        'simple-import-sort/imports': [
            2,
            {
                groups: [
                    // gulp 声明的 alias
                    ['^(@)(/?.*|$)'],
                    // Side effect imports.
                    ['^\\u0000'],
                    // 父级依赖
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // 相对依赖
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // 配置依赖
                    ['^.+\\.(config)$']
                ]
            }
        ]
    }
};
