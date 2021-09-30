module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    overrides: [
      {
        files: ['*.ts', '*.tsx'], // Your TypeScript files extension
        parserOptions: {
          project: ['./tsconfig.json'], // Specify it only for TypeScript files
        },
      },
    ],
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'prettier/@typescript-eslint',
    '@vue/airbnb',
    '@vue/typescript',
    'plugin:vue/essential',
    '@vue/prettier',
  ],
  rules: {
    'no-console':
      process.env.NODE_ENV === 'production'
        ? ['error', { allow: ['warn', 'error', 'log', 'time', 'timeEnd'] }]
        : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    'consistent-return': 'off',
    'no-return-await': 'off',
    'vue/no-parsing-error': 'error',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': 'off',
    'import/named': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': ['off'],
    'operator-linebreak': 'off',
    'arrow-body-style': 'error',
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'no-confusing-arrow': 'off',
    'function-paren-newline': 'off',
    'space-before-function-paren': 'off',
    'no-restricted-syntax': 'off',
    'no-async-promise-executor': 'off',
    'no-restricted-globals': 'off',
    'import/no-webpack-loader-syntax': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['ConditionalExpression', 'MemberExpression'],
        SwitchCase: 1,
        ArrayExpression: 1,
        CallExpression: { arguments: 1 },
        flatTernaryExpressions: true,
      },
    ],
  },
};
