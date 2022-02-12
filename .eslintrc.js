module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      plugins: ['import-helpers', '@typescript-eslint'],
      rules: {
        'import-helpers/order-imports': [
          'warn',
          {
            newlinesBetween: 'always',
            groups: [
              '/(^@angular)|(^@ionic)|(^@nestjsx)|(rxjs)|(^@capacitor)/',
              '/(models)|(common)/',
              '/(providers)/',
              '/(interactors)/',
              '/(service)/',
              '/(pages)/',
              '/(components)/',
              '/(utils)/',
              '/(assets)/',
              '/(environment)/',
              ['parent', 'sibling', 'index'],
            ],
            alphabetize: { order: 'asc', ignoreCase: true },
          },
        ],
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Page', 'Component', 'Modal'],
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'hbz',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'hbz',
            style: 'camelCase',
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};
