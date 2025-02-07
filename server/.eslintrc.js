module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs,jsx,tsx}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    semi: ["error", "always"],
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        caughtErrors: "all",
        ignoreRestSiblings: false,
        argsIgnorePattern: "*"
      },
    ],
  },
};
