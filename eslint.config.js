import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  {
    name: "General configs",
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    name: "JS configs",
    ...js.configs.recommended,
  },
  {
    name: "React configs",
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: { react },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  {
    name: "React hooks configs",
    plugins: { "react-hooks": hooks },
    rules: {
      ...hooks.configs.recommended.rules,
    },
  },
  {
    name: "Prettier configs",
    ...prettier,
  },
];
