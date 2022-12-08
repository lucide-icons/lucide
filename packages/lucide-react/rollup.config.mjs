import plugins from '@lucide/rollup-plugins';
import replace from '@rollup/plugin-replace';
import pkg from './package.json' assert { type: 'json' };

const packageName = 'LucideReact';
const outputFileName = 'lucide-react';
const outputDir = `dist`;
const inputs = [`src/lucide-react.ts`];
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
      plugins: [
        // This for aliases, only for esm
        ...(
          format !== 'esm' ? [
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
      external: ['react', 'prop-types'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
            }),
        format,
        sourcemap: true,
        preserveModules,
        globals: {
          react: 'react',
          'prop-types': 'PropTypes'
        },
      },
    })),
  )
  .flat();

export default configs;
