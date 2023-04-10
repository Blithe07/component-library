/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    // 双引号
    quotes: ["error", "double"],
    // 链式调用
  },
  env: {
    "vue/setup-compiler-macros": true,
  },
};
