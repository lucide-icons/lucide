import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const packageName = 'LucideReact';
const outputFileName = 'lucide-react-native';
const outputDir = 'dist';
const inputs = ['src/lucide-react-native.ts'];
const bundles = [
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
    inputs.map((input) => ({
      input,
      plugins: plugins(pkg, minify),
      external: ['react', 'react-native-svg'],
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
    plugins: [dts()],
  },
  ...configs,
];
