import globals from "globals";
import pluginJs from "@eslint/js";
import solid from "eslint-plugin-solid/configs/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  solid,
];
