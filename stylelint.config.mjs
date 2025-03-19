// @ts-check

/** @type {import('stylelint').Config} */
const config = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    "import-notation": "string",
  },
  overrides: [
    {
      files: ["**/*.module.css"],
      extends: ["stylelint-config-css-modules"],
      rules: {
        "selector-class-pattern": [
          "^[a-z][a-zA-Z0-9]*$",
          {
            message: (selector) =>
              `Expected class selector "${selector}" to be camelCase`,
          },
        ],
      },
    },
  ],
};

export default config;
