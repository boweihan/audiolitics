module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'google'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react'],
  rules: {
    'object-curly-spacing': 'off',
    quotes: 'off',
    'new-cap': 'off',
    'max-len': 'off',
    'arrow-parens': 'off',
    'no-invalid-this': 'off',
    'require-jsdoc': 'off',
  },
};
