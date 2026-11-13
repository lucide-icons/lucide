import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };
import getIconEntryNamesAndAliases from './scripts/getIconEntryNamesAndAliases.mts';

const dtsOptions = {
  includeExternal: ['@lucide/shared/types'],
  tsconfig: './tsconfig.json',
};

const packageName = 'LucideReact';
const outputFileName = 'lucide-react-native';
const outputDir = 'dist';
const iconAndAliasEntries = await getIconEntryNamesAndAliases();
// Alias modules (e.g. `icons/trash-2`) aren't imported by the index, so list them as entries
// to emit the runtime files the `./icons/*` export map points at.
const inputs = [
  'src/lucide-react-native.ts',
  'src/icons/index.ts',
  ...Object.values(iconAndAliasEntries),
];
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

const typesModuleMatcher = /[/\\]src[/\\]types\.(d\.)?ts$/;

// With `preserveModules`, every output module would get its own license banner, which
// repeats it ~2,000 times in consumer bundles (#3744). Every icon, and any direct use of
// the `Icon` component, imports `Icon`, so keeping the banner only there includes it
// exactly once in any bundle that renders an icon.
const licenseModuleMatcher = /[/\\]src[/\\]Icon\.ts$/;
const isNotLicenseChunk = (chunk) => !licenseModuleMatcher.test(chunk.facadeModuleId ?? '');

const configs = bundles.map(({ inputs, outputDir, format, preserveModules, extension = 'js' }) => ({
  input: inputs,
  plugins: plugins({ pkg, licenseBannerExclude: isNotLicenseChunk }),
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
    plugins: [dts(dtsOptions)],
  },
  {
    input: 'src/icons/index.ts',
    output: [
      {
        file: `dist/types/icons.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
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
    plugins: [dts(dtsOptions)],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/types/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  ...configs,
];
