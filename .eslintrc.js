module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
