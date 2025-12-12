import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' with {type: 'json'};
import dts from 'rollup-plugin-dts';

const packageName = '@lucide/icons';
const outputFileName = 'lucide-icons';
const inputs = [`src/lucide-icons.ts`];
const bundles = [
  {
    format: 'cjs',
    inputs,
    extension: 'cjs',
  },
  {
    format: 'esm',
    inputs: [...inputs, './src/dynamic.ts', './src/build.ts'],
    preserveModules: true,
    extension: 'mjs',
  },
];

const configs = bundles
  .map(
    ({
       inputs,
       outputDir = 'dist',
       outputFile,
       format,
       minify,
       preserveModules,
       entryFileNames,
       external = [],
       paths,
       extension = 'js',
     }) =>
      inputs.map((input) => ({
        input,
        plugins: [
          ...plugins({pkg, minify}),
        ],
        external,
        output: {
          name: packageName,
          entryFileNames,
          ...(preserveModules
            ? {
              dir: `${outputDir}/${format}`,
              entryFileNames: `[name].${extension}`,
            }
            : {
              file: outputFile ?? `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.${extension}`,
            }),
          paths,
          format,
          sourcemap: true,
          preserveModules,
          exports: 'named',
          globals: {},
          preserveModulesRoot: 'src',
        },
      })),
  )
  .flat();

export default [
  ...[
    outputFileName,
    `${outputFileName}.prefixed`,
    `${outputFileName}.suffixed`,
    'dynamic',
    'build'
  ].map(filename => (
    {
      input: `./src/${filename}.ts`,
      output: [{
        file: `dist/esm/${filename}.d.ts`, format: 'esm'
      }, {
        file: `dist/cjs/${filename}.d.cts`, format: 'cjs'
      }],
      plugins: [dts()],
    })
  ),
  ...configs,
];
