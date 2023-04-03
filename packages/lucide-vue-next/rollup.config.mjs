import plugins, { replace } from '@lucide/rollup-plugins';
import pkg from './package.json' assert { type: 'json' };

const packageName = 'LucideVueNext';
const outputFileName = 'lucide-vue-next';
const outputDir = 'dist';
const inputs = ['src/lucide-vue-next.ts'];
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
        // This for aliases, only for esm
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
        sourcemap: true,
        globals: {
          vue: 'vue',
        },
      },
    })),
  )
  .flat();

export default configs;
