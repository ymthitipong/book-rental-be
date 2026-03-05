// @ts-check
import eslint from '@eslint/js';
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
    perfectionist,
  },
    rules: {
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "perfectionist/sort-interfaces": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "object-curly-newline": [
        "error",
        {
          ImportDeclaration: {
            multiline: true,
            minProperties: 3,
            consistent: true,
          },
          ObjectExpression: {
            multiline: true,
            minProperties: 3,
          },
          ObjectPattern: {
            multiline: true,
            minProperties: 3,
          },
        },
      ],
    },
  },
);