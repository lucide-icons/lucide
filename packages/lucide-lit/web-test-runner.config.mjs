import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default /** @type {import('@web/test-runner').TestRunnerConfig} */ ({
  rootDir: dirname,
  files: ['tests/icon.wtr.test.ts', 'tests/createLucideIcon.wtr.test.ts'],
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2022',
    }),
  ],
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    }),
  ],
  testFramework: {
    config: {
      timeout: '15000',
    },
  },
});
