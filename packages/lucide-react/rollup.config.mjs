import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' assert { type: 'json' };
import dts from 'rollup-plugin-dts';
import getAliasesEntryNames from './scripts/getAliasesEntryNames.mjs';

const aliasesEntries = await getAliasesEntryNames();

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
    format: 'esm',
    inputs: [...inputs, ...aliasesEntries],
    outputDir,
    preserveModules: true,
  },
  {
    format: 'esm',
    inputs: ['src/dynamicIconImports.ts'],
    outputFile: 'dynamicIconImports.js',
    external: [/src/],
    paths: (id) => {
      if (id.match(/src/)) {
        const [, modulePath] = id.match(/src\/(.*)\.ts/);

        return `dist/esm/${modulePath}.js`;
      }
    },
  },
];

const configs = bundles
  .map(
    ({
      inputs,
      outputDir,
      outputFile,
      format,
      minify,
      preserveModules,
      entryFileNames,
      external = [],
      paths,
    }) =>
      inputs.map((input) => ({
        input,
        plugins: plugins({ pkg, minify }),
        external: ['react', 'prop-types', ...external],
        output: {
          name: packageName,
          ...(preserveModules
            ? {
                dir: `${outputDir}/${format}`,
              }
            : {
                file:
                  outputFile ??
                  `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
              }),
          paths,
          entryFileNames,
          format,
          sourcemap: true,
          preserveModules,
          preserveModulesRoot: 'src',
          globals: {
            react: 'react',
            'prop-types': 'PropTypes',
          },
        },
      })),
  )
  .flat();

export default [
  {
    input: 'src/dynamicIconImports.ts',
    output: [
      {
        file: `dynamicIconImports.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: inputs[0],
    output: [
      {
        file: `dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
