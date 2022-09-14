import plugins from '../../rollup.plugins';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const packageName = 'LucideReact';
const outputFileName = 'lucide-react';
const outputDir = `dist`;
const inputs = [`src/lucide-react.ts`];
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
    format: 'es',
    inputs,
    outputDir,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify }) =>
    inputs.map(input => ({
      input,
      plugins: [
        esbuild({
          minify,
        }),
        ...plugins(pkg, minify),
      ],
      external: ['react', 'prop-types', 'lucide'],
      output: {
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          react: 'react',
          'prop-types': 'PropTypes',
          lucide: 'lucide',
        },
      },
    })),
  )
  .flat();

const typesFileConfig = {
  input: inputs[0],
  output: [
    {
      file: `${outputDir}/${outputFileName}.d.ts`,
      format: 'es',
    },
  ],
  plugins: [
    dts({
      include: ['src'],
    }),
  ],
};

export default [...configs, typesFileConfig];
