import plugins from '@lucide/rollup-plugins';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';
import getAliasesEntryNames from './scripts/getAliasesEntryNames.mts';

const aliasesEntries = await getAliasesEntryNames();

const packageName = 'LucideReact';
const outputFileName = 'lucide-react';
const inputs = [`src/lucide-react.ts`];
const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir: 'dist/cjs',
  },
  {
    format: 'esm',
    inputs: [...inputs, , 'src/dynamicIconImports.ts', 'src/DynamicIcon.ts', ...aliasesEntries],
    outputDir: 'dist/esm',
    preserveModules: true,
  },
  {
    format: 'esm',
    inputs: ['src/dynamic.ts'],
    outputFile: 'dynamic.mjs',
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
        plugins: [
          ...plugins({ pkg, minify }),
          // Make sure we emit "use client" directive to make it compatible with Next.js
          preserveDirectives({
            include: 'src/DynamicIcon.ts',
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
