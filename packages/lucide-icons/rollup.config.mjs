import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' with {type: 'json'};
import dts from 'rollup-plugin-dts';

const packageName = '@lucide/icons';
const outputFileName = 'lucide-icons';
const inputs = [`src/lucide-icons.ts`];
const bundles = [
  {
    format: 'umd',
    inputs,
    minify: true,
  },
  {
    format: 'umd',
    inputs,
  },
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
  /*
  {
    format: 'esm',
    inputs: ['src/dynamic.ts'],
    outputFileName: 'dynamic',
    external: [/src/],
    paths: (id) => {
      if (id.match(/src/)) {
        const [, modulePath] = id.match(/src\/(.*)\.ts/);

        return `${modulePath}.js`;
      }
    },
  },
  {
    format: 'esm',
    inputs: ['src/build.ts'],
    outputFileName: 'build.mjs',
    external: [/src/],
    paths: (id) => {
      if (id.match(/src/)) {
        const [, modulePath] = id.match(/src\/(.*)\.ts/);

        return `${modulePath}.js`;
      }
    },
  },
   */
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
      }, {
        file: `dist/umd/${filename}.d.ts`, format: 'umd'
      }],
      plugins: [dts()],
    })
  ),
  ...configs,
];
