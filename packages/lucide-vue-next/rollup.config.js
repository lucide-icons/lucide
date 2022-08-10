import plugins from '../../rollup.plugins';
import pkg from './package.json';

const packageName = 'LucideVueNext';
const outputFileName = 'lucide-vue-next';
const outputDir = 'dist';
const inputs = ['src/lucide-vue-next.js'];
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
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify }) =>
    inputs.map(input => ({
      input,
      plugins: plugins(pkg, minify),
      external: ['vue'],
      output: {
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          vue: 'vue',
        },
      },
    })),
  )
  .flat();

export default configs;
