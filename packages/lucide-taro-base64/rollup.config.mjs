import plugins from '@lucide/rollup-plugins';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';
import getAliasesEntryNames from './scripts/getAliasesEntryNames.mts';

const aliasesEntries = await getAliasesEntryNames();

const packageName = 'LucideTaroHtml';
const outputFileName = 'lucide-taro-base64';
const inputs = [`src/lucide-taro-base64.ts`];
const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir: 'dist/cjs',
  },
  {
    format: 'esm',
    inputs,
    outputDir: 'dist/esm',
    preserveModules: true,
  },
  {
    format: 'esm',
    inputs: ['src/dynamicIconImports.ts', 'src/DynamicIcon.ts', ...aliasesEntries],
    outputDir: 'dist/esm',
    external: [/src/],
    preserveModules: true,
    paths: (id) => {
      if (id.match(/src/)) {
        const match = id.match(/src\/(.*)\.ts/);
        if (match && match[1]) {
          return `./${match[1]}.js`;
        }
      }
    },
  },
  {
    format: 'esm',
    inputs: ['src/dynamic.ts'],
    outputFile: 'dynamic.mjs',
    external: [/src/],
    paths: (id) => {
      if (id.match(/src/)) {
        const match = id.match(/src\/(.*)\.ts/);
        if (match && match[1]) {
          return `dist/esm/${match[1]}.js`;
        }
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
        plugins: [
          ...plugins({ pkg, minify }),
          // Make sure we emit "use client" directive to make it compatible with Next.js
          preserveDirectives({
            include: [
              'src/lucide-taro-base64.ts',
              'src/DynamicIcon.ts',
              'src/context.ts',
              'src/Icon.ts',
            ],
            suppressPreserveModulesWarning: true,
          }),
        ],
        external: ['react', 'prop-types', ...external],
        output: {
          name: packageName,
          ...(preserveModules
            ? {
                dir: outputDir,
              }
            : {
                file: outputFile ?? `${outputDir}/${outputFileName}.js`,
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
      // Extra declaration file with .d.mts extension for better compatibility with ESM environments
      {
        file: `dynamicIconImports.d.mts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: 'src/dynamic.ts',
    output: [
      {
        file: `dynamic.d.ts`,
        format: 'es',
      },
      // Extra declaration file with .d.mts extension for better compatibility with ESM environments
      {
        file: `dynamic.d.mts`,
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
