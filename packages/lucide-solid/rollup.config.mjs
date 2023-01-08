import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' assert { type: 'json' };
import solidPlugin from 'vite-plugin-solid';

const packageName = 'LucideSolid';
const outputFileName = 'lucide-solid';
const outputDir = 'dist';
const inputs = [`src/lucide-solid.ts`];
const bundles = [
  // {
  //   format: 'umd',
  //   inputs,
  //   outputDir,
  //   minify: true,
  // },
  // {
  //   format: 'umd',
  //   inputs,
  //   outputDir,
  // },
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
        ...plugins(pkg, minify, {
          jsx: 'preserve'
        }),
        solidPlugin()
      ],
      external: ['solid-js', 'solid-js/web'],
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
          'solid-js': 'solid-js',
          'solid-js/h': 'solid-js/h',
        },
      },
    })),
  )
  .flat();

export default configs;
