import plugins, { replace } from '@lucide/rollup-plugins';
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
    aliasesSupport: true
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
    aliasesSupport: true
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules, aliasesSupport }) =>
    inputs.map(input => ({
      input,
      plugins: [
        ...(
          !aliasesSupport ? [
            replace({
              "export * from './aliases';": '',
              "export * as icons from './icons';": '',
              delimiters: ['', ''],
              preventAssignment: false,
            }),
          ] : []
        ),
        ...plugins(pkg, minify)
      ],
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
