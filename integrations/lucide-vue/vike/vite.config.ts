import vike from 'vike/plugin';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vike(), vue()],
});
