module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-bitwise': 'off',
    'import/extensions': 'off',
    'no-use-before-define': [
      'error',
      {functions: false, classes: false, variables: false},
    ],
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0}],
  },
};
