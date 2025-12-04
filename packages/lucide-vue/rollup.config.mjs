import plugins, { replace } from '@lucide/rollup-plugins';
import pkg from './package.json' with { type: 'json' };

const packageName = 'LucideVue';
const outputFileName = 'lucide-vue';
const outputDir = 'dist';
const inputs = ['src/lucide-vue.ts'];
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
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
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

export default configs;
