import dts from 'rollup-plugin-dts';
import plugins from '../../rollup.plugins.mjs';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json' assert { type: 'json' };

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
    preserveModulesRoot: 'src',
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules, preserveModulesRoot }) =>
    inputs.map(input => ({
      input,
      plugins: [
        // typescript(
        //   preserveModules && {
        //     compilerOptions: {
        //       outDir: `${outputDir}/${format}`,
        //       rootDir: 'src',
        //     },
        //   },
        // ),
        esbuild({
          minify,
        }),
        ...plugins(pkg, minify),
      ],
      output: {
        name: outputFileName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              preserveModulesRoot,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
            }),
        format,
        sourcemap: true,
        preserveModules,
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
