module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'react-app',
    'react-app/jest',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-undef': 'error',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
    'no-restricted-globals': 'off',
    'no-empty': 'off',
    'no-useless-escape': 'off',
    'no-case-declarations': 'off',
    'no-async-promise-executor': 'off',
    'no-use-before-define': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    '**/*.min.js',
    '**/*.min.*',
    '**/dist/*',
    '**/build/*',
    'node_modules',
    'public/*',
    'coverage/*',
    '*.bundle.js'
  ]
}; 