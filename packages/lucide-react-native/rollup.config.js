import plugins from '../../rollup.plugins';
import pkg from './package.json';

const packageName = 'LucideReact';
const outputFileName = 'lucide-react-native';
const outputDir = 'dist';
const inputs = ['src/lucide-react-native.js'];
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
    preserveModules: true,
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
    inputs.map(input => ({
      input,
      plugins: plugins(pkg, minify),
      external: ['react', 'prop-types', 'lucide', 'react-native-svg'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              exports: 'auto',
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
            }),
        format,
        preserveModules,
        sourcemap: true,
        globals: {
          react: 'react',
          'react-native-svg': 'react-native-svg',
          'prop-types': 'PropTypes',
          lucide: 'lucide',
        },
      },
    })),
  )
  .flat();

export default configs;
