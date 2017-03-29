module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'react',
    'mocha'
  ],
  rules: {
    camelcase: 'off',
    'arrow-body-style': 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    'no-plusplus': 'off',
    /*
     * Airbnb sets devDependencies: false. I've set it to true
     * in order for our test files to import devDependencies.
     * NOTE: this plugin offers the option to pass globs, the idea being we could
     * whitelist files ending in *.test.js. However I could not get it to run. See
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
     */
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false
      }
    ],
    'mocha/no-exclusive-tests': 'error',
    'react/jsx-no-target-blank': 'warn',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-stateless-function': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/no-unused-prop-types': 'off' // https://github.com/yannickcr/eslint-plugin-react/issues/811
  }
};