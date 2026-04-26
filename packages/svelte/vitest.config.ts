import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [
    svelte({
      compilerOptions: { hmr: false },
    }),
    svelteTesting(),
  ],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupVitest.ts',
  },
}));
