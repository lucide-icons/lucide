import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import plugins from '../../rollup.plugins';
import pkg from './package.json';

const outputFileName = pkg.name;
const outputDir = 'dist';
const inputs = ['src/lucide.ts'];
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
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules }) =>
    inputs.map(input => ({
      input,
      plugins: [
        typescript(
          preserveModules && {
            compilerOptions: {
              outDir: `${outputDir}/${format}`,
              rootDir: 'src',
            },
          },
        ),
        ...plugins(pkg, minify),
      ],
      output: {
        name: outputFileName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
      },
    })),
  )
  .flat();

const typesFileConfig = {
  input: 'src/sdk.ts',
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
