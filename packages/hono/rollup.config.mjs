import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const dtsOptions = {
  includeExternal: ['@lucide/shared/types'],
  tsconfig: './tsconfig.json',
};

const packageName = 'LucideHono';
const outputFileName = 'lucide-hono';
const outputDir = 'dist';
const inputs = [`src/lucide-hono.ts`];
const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
    extension: 'mjs',
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, preserveModules, extension = 'js' }) =>
    inputs.map((input) => ({
      input,
      plugins: plugins({
        pkg,
        esbuildOptions: { jsx: 'automatic', jsxImportSource: 'hono/jsx' },
      }),
      external: ['hono', 'hono/css', 'hono/jsx', 'hono/jsx/jsx-runtime'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              entryFileNames: `[name].${extension}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}.${extension}`,
            }),
        preserveModules,
        format,
        sourcemap: true,
        preserveModulesRoot: 'src',
        globals: {
          hono: 'hono',
          'hono/css': 'hono/css',
          'hono/jsx': 'hono/jsx',
          'hono/jsx/jsx-runtime': 'hono/jsx/jsx-runtime',
        },
      },
    })),
  )
  .flat();

export default [
  {
    input: inputs[0],
    output: [
      {
        file: `dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  ...configs,
];
