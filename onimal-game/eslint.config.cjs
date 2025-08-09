const js = require('@eslint/js');
const svelte = require('eslint-plugin-svelte');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');

module.exports = [
  { languageOptions: { globals: { ...globals.browser } } },
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: { parserOptions: { parser: tsParser } },
    rules: {},
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': ts },
    rules: { ...ts.configs.recommended.rules },
  },
];
