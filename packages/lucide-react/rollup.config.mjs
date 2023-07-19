import plugins, { replace } from '@lucide/rollup-plugins';
import pkg from './package.json' assert { type: 'json' };
import dts from "rollup-plugin-dts";

const packageName = 'LucideReact';
const outputFileName = 'lucide-react';
const outputDir = `dist`;
const inputs = [`src/lucide-react.ts`];
const bundles = [
  {
    format: 'umd',
    extension: 'js',
    inputs,
    outputDir,
    minify: true,
  },
  {
    format: 'umd',
    extension: 'js',
    inputs,
    outputDir,
  },
  {
    format: 'cjs',
    extension: 'cjs',
    inputs,
    outputDir,
    aliasesSupport: true,
  },
  {
    format: 'esm',
    extension: 'mjs',
    inputs: [
      ...inputs,
      'src/dynamicIconImports.ts',
    ],
    outputDir,
    preserveModules: true,
    aliasesSupport: true,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules, aliasesSupport, extension }) =>
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
      external: ['react', 'prop-types'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              entryFileNames: `[name].${extension}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.${extension}`,
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

export default [
  {
    input: 'src/dynamicIconImports.ts',
    output: [{
      file: `dist/dynamicIconImports.d.ts`, format: "es"
    }],
    plugins: [dts()],
  },
  {
    input: inputs[0],
    output: [{
      file: `dist/${outputFileName}.d.ts`, format: "es"
    }],
    plugins: [dts()],
  },
  ...configs
];
