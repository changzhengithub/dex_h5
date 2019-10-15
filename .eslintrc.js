module.exports = {
  root: true,
  env: {
    node: true
  },
  // 全局注入
  globals: {
    'JsInterface': true,
    'webkit': true,
    'OpenInstall': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
