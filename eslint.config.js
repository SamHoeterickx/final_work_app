const { FlatCompat } = require('@eslint/eslintrc');
const prettier = require('eslint-plugin-prettier/recommended');
const reactNative = require('eslint-plugin-react-native');
// 1. Importeer de TypeScript plugin (deze is al geïnstalleerd via de expo config)
const typescriptEslint = require('@typescript-eslint/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('expo'),
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-native': reactNative,
      // 2. Koppel de naam aan de geïmporteerde plugin, zodat de linter de rules snapt
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
