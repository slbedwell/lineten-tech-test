module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
    plugins: [],
    rules: {
        camelcase: ['off'],
        indent: ['error', 4,
            {
                SwitchCase: 1,
            },
        ],
        'vue/html-indent': ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
            },
        ],
        'vue/multiline-html-element-content-newline': [
            'error',
            {
                allowEmptyLines: true,
            },
        ],
        'no-console': [
            'warn',
            {
                allow: [
                    'warn',
                    'error',
                ],
            },
        ],
        'space-before-function-paren': [
            'error',
            {
                named: 'never',
            },
        ],
    },
};
