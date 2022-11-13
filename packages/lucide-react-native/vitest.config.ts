import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import commonJS from '@rollup/plugin-commonjs';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
  plugins: [
    react({
      // include: [
      //   '/prop-types/',
      //   /react-test-renderer/,
      //   /react-native-svg/
      // ]
    }),
    // viteCommonjs({
    //   include: [
    //     'react-native',
    //     'react-test-renderer',
    //     'react-native-svg'
    //   ]
    // }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.jsx?$/],
    },
    setupFiles: './tests/setupVitest.js',
    // threads: false,
    // isolate: false,
    mockReset: true,
    // deps: {
    //   inline: [
    //     /react-test-renderer/,
    //     /react-native-svg/
    //   ],
    // },
  },
  // esbuild: {
  //   target: 'es6',
  // }
  // resolve: {
  //   alias:
  // }
  // resolve: {
  //   conditions: ['development', 'browser'],
  // },
});
