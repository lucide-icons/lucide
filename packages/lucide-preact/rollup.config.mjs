import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' assert { type: "json" };

const packageName = 'LucidePreact';
const outputFileName = 'lucide-preact';
const outputDir = 'dist';
const inputs = [`src/lucide-preact.ts`];
const bundles = [
  {
    format: 'umd',
    inputs,
    outputDir,
    minify: true,
  },
  {
    format: 'umd',
    inputs,
    outputDir,
  },
  {
    format: 'cjs',
    inputs,
    outputDir,
  },
  {
    format: 'es',
    inputs,
    outputDir,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules }) =>
    inputs.map(input => ({
      input,
      plugins: plugins(pkg, minify),
      external: ['preact', 'prop-types'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
            }),
        preserveModules,
        format,
        sourcemap: true,
        globals: {
          preact: 'preact',
          'prop-types': 'PropTypes',
        },
      },
    })),
  )
  .flat();

export default configs;
