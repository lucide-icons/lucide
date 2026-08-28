import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };
import getIconEntryNamesAndAliases from './scripts/getIconEntryNamesAndAliases.mts';

const packageName = 'LucideReact';
const outputFileName = 'lucide-react-native';
const outputDir = 'dist';
const inputs = ['src/lucide-react-native.ts', 'src/icons/index.ts'];
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
    extension: 'mjs',
  },
];

const iconAndAliasEntries = await getIconEntryNamesAndAliases();
const typesModuleMatcher = /[/\\]src[/\\]types\.(d\.)?ts$/;

const configs = bundles.map(({ inputs, outputDir, format, preserveModules, extension = 'js' }) => ({
  input: inputs,
  plugins: plugins({ pkg }),
  external: ['react', 'react-native-svg'],
  output: {
    name: packageName,
    ...(preserveModules
      ? {
          dir: `${outputDir}/${format}`,
          entryFileNames: `[name].${extension}`,
        }
      : {
          file: `${outputDir}/${format}/${outputFileName}.${extension}`,
        }),
    format,
    preserveModules,
    preserveModulesRoot: 'src',
    sourcemap: true,
    globals: {
      react: 'react',
      'react-native-svg': 'react-native-svg',
    },
  },
}));

export default [
  {
    input: inputs[0],
    output: [
      {
        file: `dist/types/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: 'src/icons/index.ts',
    output: [
      {
        file: `dist/types/icons.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: iconAndAliasEntries,
    // Treat `src/types.ts` as external so `LucideProps` isn't bundled into a shared
    // hashed chunk; `output.paths` then rewrites the import to the main entry.
    external: [typesModuleMatcher],
    output: [
      {
        format: 'es',
        dir: 'dist/types/icons',
        entryFileNames: '[name].d.ts',
        paths: (id) => (typesModuleMatcher.test(id) ? `../${outputFileName}.js` : id),
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/types/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/types/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
