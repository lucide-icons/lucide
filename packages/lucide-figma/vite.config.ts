import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'path';

const entries = {
  main: resolve(__dirname, 'src/main.ts'),
  interface: resolve(__dirname, './src/interface/interface.html'),
  worker: resolve(__dirname, './src/worker/worker.html'),
};

const input = {};

if (process.env['INPUT']) {
  const entry = process.env['INPUT'];
  input[entry] = entries[entry];
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    emptyOutDir: false,
    rollupOptions: {
      input,
      inlineDynamicImports: true,
      output: {
        manualChunks: (chunk) => 'all.js',
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
