import next from 'eslint-config-next';

/**
 * Flat config, consumed directly.
 *
 * This previously went through `FlatCompat` + `compat.extends('next/...')`,
 * which throws on eslint-config-next v16 — that package now ships a native flat
 * config array. Combined with eslint never being in package.json at all, it
 * meant none of the rules below had ever actually run.
 */
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
      // Unused variables and imports — the main thing worth catching here.
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
    // The shadcn/ui primitives are vendored, largely unused, and not ours to
    // restyle. Lint them for correctness only, not for house rules.
    files: ['src/app/components/ui/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];
