// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import commentsPlugin from "@eslint-community/eslint-plugin-eslint-comments/configs";
import prettierConfig from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unicornPlugin from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  unicornPlugin.configs.recommended,
  {
    extends: [
      importPlugin.flatConfigs?.recommended,
      importPlugin.flatConfigs?.typescript,
      importPlugin.flatConfigs?.react,
    ],
  },
  // @ts-expect-error -- type error, but it is actually working
  commentsPlugin.recommended,
  jsxA11yPlugin.flatConfigs.strict,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooksPlugin.configs["recommended-latest"],
  compat.extends("plugin:@next/next/recommended"),
  {
    plugins: {
      "react-compiler": reactCompilerPlugin,
    },
  },
  compat.extends("plugin:drizzle/recommended"),
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true },
        node: true,
      },
      "jsx-a11y": {
        polymorphicPropName: "as",
        components: {
          Button: "button",
          IconButton: "button",
          Image: "img",
          Link: "a",
        },
      },
      react: { version: "detect" },
      linkComponents: ["Link"],
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "^@radix-ui/themes(/components/index)?$",
              message:
                'Please use `import { <Component> } from "@radix-ui/themes/components/<component>"`instead, to avoid unnecessary Radix dependencies being bundled to the client bundle, due to Next.js bundling behavior and Radix Themes now imports from `radix-ui` instead of `@radix-ui/<component>`.',
            },
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
      "import/default": "off",
      "import/namespace": "off",
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc" },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "react-compiler/react-compiler": "error",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          multiline: "last",
          reservedFirst: true,
          shorthandFirst: true,
        },
      ],
      "sort-imports": ["warn", { ignoreDeclarationSort: true }],
      "unicorn/prevent-abbreviations": "off",
    },
  },
  {
    files: ["**/*.*js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
);

export default config;
