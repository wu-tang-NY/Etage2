// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'arrow-parens': 0,
    'quote-props': 0,
    'no-console': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    'no-mixed-operators': 0,
    'no-plusplus': 0,
    'func-names': ["error", "never"],
    'no-bitwise': ['error', { 'allow': ['~'] }],
    'no-underscore-dangle': 0,
    "import/extensions": ["never"],
    'camelcase': 0,
    'func-names': ['error', 'as-needed'],
    'import/no-dynamic-require': 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-param-reassign': ['error', {
      props: false
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
