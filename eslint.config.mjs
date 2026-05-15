import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    ignores: [
      "node_modules/**",
      "e2e/node_modules/**",
      "e2e/playwright-report/**",
      "e2e/test-results/**",
      "ui/node_modules/**",
      "ui/coverage/**",
      "ui/dist/**",
    ],
  },
  {
    files: ["e2e/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["ui/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    files: ["ui/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
];
