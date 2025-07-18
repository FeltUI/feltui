import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";

import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...ts.config(...ts.configs.recommended, {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  }),

  ...svelte.configs["flat/recommended"],
  prettier,
  ...svelte.configs["flat/prettier"],

  {
    rules: {
      "svelte/require-each-key": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
      },
    },
  },

  {
    ignores: ["**/dist/", "**/build/", "**/node_modules/", "**/.svelte-kit/"],
  },
]);
