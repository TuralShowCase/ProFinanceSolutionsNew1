import next from 'eslint-config-next';


export default [
  ...next,

  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'e2e/**-snapshots/**',
      'test-results/**',
      'scripts/**',
      'src/imports/**',
      'next-env.d.ts',
    ],
  },

  {
    rules: {
     
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'no-empty': ['error', { allowEmptyCatch: false }],
    },
  },

  {
   
   
    files: ['src/app/components/ui/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];
