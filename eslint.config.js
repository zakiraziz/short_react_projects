import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

export default [
  { ignores: ['dist', 'node_modules', 'build', '*.min.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      
      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Variables
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrors: 'none'
      }],
      'no-undef': 'error',
      
      // Import/Export
      'import/no-unresolved': 'error',
      'import/named': 'warn',
      'import/default': 'warn',
      'import/namespace': 'warn',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'warn',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'warn',
      'import/export': 'error',
      'import/no-duplicates': 'warn',
      
      // React Hooks additional safety
      'react-hooks/exhaustive-deps': 'warn',
      
      // Code quality
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'warn',
      
      // JSX specific
      'react/jsx-uses-react': 'off', // Not needed for React 17+
      'react/jsx-uses-vars': 'error',
      
      // Accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      
      // Error prevention
      'no-duplicate-imports': 'error',
      'no-const-assign': 'error',
      'no-class-assign': 'error',
      'no-func-assign': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  // Additional configuration for test files
  {
    files: ['**/*.test.{js,jsx}', '**/__tests__/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-console': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  // Configuration for configuration files
  {
    files: ['*.config.js', '.*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
      'import/no-commonjs': 'off',
    },
  },
]
