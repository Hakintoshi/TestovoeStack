import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import babelParser from '@babel/eslint-parser';
import vueParser from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.vue', '**/*.js'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/max-attributes-per-line': ['error', { singleline: 5 }],
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'never', normal: 'always', component: 'always' },
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    },
  },
  eslintPluginPrettierRecommended,
];
