const { FlatCompat } = require('@eslint/eslintrc');
const prettier = require('eslint-plugin-prettier/recommended');
const reactNative = require('eslint-plugin-react-native');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: ['eslint.config.js'],
  },
  ...compat.extends('expo'),
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-native': reactNative,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
