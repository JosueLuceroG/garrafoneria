import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["**/dist/**", "**/build/**", "**/.expo/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "no-console": "warn",
      "no-constant-binary-expression": "error",
    },
  },
];
