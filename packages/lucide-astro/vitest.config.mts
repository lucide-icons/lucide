import { getViteConfig } from 'astro/config'
import type { ViteUserConfig } from "vitest/config"

export default getViteConfig({
  // @ts-expect-error: types of this functions aren't correct
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './tests/setupVitest.js',
  },
} satisfies ViteUserConfig)
