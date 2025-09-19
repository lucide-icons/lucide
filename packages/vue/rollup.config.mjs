import plugins from '@lucide/rollup-plugins';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';

const packageName = '@lucide/vue';
const outputFileName = 'lucide-vue';
const outputDir = 'dist';
const inputs = ['src/lucide-vue.ts'];
const bundles = [
  {
    format: 'cjs',
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
    inputs.map((input) => ({
      input,
      plugins: plugins({ pkg, minify }),
      external: ['vue'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}.js`,
            }),
        format,
        preserveModules,
        preserveModulesRoot: 'src',
        sourcemap: true,
        globals: {
          vue: 'vue',
        },
      },
    })),
  )
  .flat();

export default [
  {
    input: inputs[0],
    output: [
      {
        file: `dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  },
  ...configs,
];
