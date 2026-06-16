import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "url";
import path from "path";

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".gitignore"),
  ),
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["e2e/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs["recommended-typescript"],
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
];
