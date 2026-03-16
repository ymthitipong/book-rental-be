// @ts-check
import perfectionist from "eslint-plugin-perfectionist";
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist', 'node_modules', 'db'],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts'],
  },
  {
    plugins: {
    perfectionist,
  },
    rules: {
       "sort-keys": ["error", "asc", { "caseSensitive": true }],
      '@typescript-eslint/no-unsafe-argument': 'off',
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