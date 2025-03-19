// @ts-check

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {},
    "@csstools/postcss-global-data": {
      files: ["node_modules/@radix-ui/themes/src/styles/breakpoints.css"],
    },
    "postcss-custom-media": {},
    autoprefixer: {},
  },
};

export default config;
