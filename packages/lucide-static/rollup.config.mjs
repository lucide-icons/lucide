import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const outputFileName = pkg.name;
const outputDir = 'dist';
const inputs = ['src/lucide-static.ts'];
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
    extension: 'mjs',
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules, extension = 'js' }) =>
    inputs.map((input) => ({
      input,
      plugins: plugins({ pkg, minify }),
      output: {
        name: outputFileName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              entryFileNames: `[name].${extension}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.${extension}`,
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
      format: 'esm',
    },
  ],
  plugins: [
    dts({
      include: ['src'],
    }),
  ],
};

export default [...configs, typesFileConfig];
