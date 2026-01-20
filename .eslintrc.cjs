module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Disallow unused imports/variables (including const).
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // Props interfaces must be named ComponentNameProps (not just Props).
    'no-restricted-syntax': [
      'error',
      {
        selector: "TSInterfaceDeclaration[id.name='Props']",
        message:
          "Don't name props interface 'Props'. Use 'ComponentNameProps' (e.g. 'ButtonProps').",
      },
    ],

    // Basic naming conventions.
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'interface', format: ['PascalCase'] },
    ],
  },

  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        // Props interfaces in components must be named ComponentNameProps.
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            filter: { regex: 'Props$', match: true },
            format: ['PascalCase'],
            custom: { regex: '^[A-Z][A-Za-z0-9]*Props$', match: true },
          },
          { selector: 'interface', format: ['PascalCase'] },
        ],

        // No component file should exceed 300 lines.
        'max-lines': [
          'error',
          { max: 300, skipBlankLines: true, skipComments: true },
        ],
      },
    },
  ],
}
