import { getViteConfig } from 'astro/config'

export default getViteConfig({
  // @ts-ignore
  test: {
    environment: 'node',
    globals: true,
    setupFiles: './tests/setupVitest.js',
  },
});
