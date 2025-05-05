import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPreferArrow from "eslint-plugin-prefer-arrow";
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: "eslint:recommended",
});

const lint = [
  ...compat.extends(),
  ...tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        NodeJS: true,
      },
    },
    plugins: {
      import: eslintPluginImport,
      "prefer-arrow": eslintPluginPreferArrow,
    },
    rules: {
      "object-curly-spacing": ["error", "always"],
      "react/prop-types": "off",
      "react/display-name": "off",
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "react-native/no-inline-styles": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "warn",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@common/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@front/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@back/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration",
          message:
            "Function declarations are not allowed. Use arrow functions instead.",
        },
      ],
    },
  },
];

export default lint;
