import plugins, { replace } from '@lucide/rollup-plugins';
import dts from "rollup-plugin-dts";
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
      external: ['preact'],
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
        },
      },
    })),
  )
  .flat();

  export default [
    {
      input: inputs[0],
      output: [{
        file: `dist/${outputFileName}.d.ts`, format: "es"
      }],
      plugins: [dts()],
    },
    ...configs
  ];

