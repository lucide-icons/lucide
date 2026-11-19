import plugins from '@lucide/rollup-plugins';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import pkg from './package.json' with { type: 'json' };
import dts from 'rollup-plugin-dts';
import getAliasesEntryNames from './scripts/getAliasesEntryNames.mts';

const dtsOptions = {
  includeExternal: ['@lucide/shared/types'],
  tsconfig: './tsconfig.json',
};

const aliasesEntries = await getAliasesEntryNames();

const packageName = 'LucideReact';
const outputFileName = 'lucide-react';
const inputs = [`src/lucide-react.ts`];
const bundles = [
  {
    format: 'cjs',
    inputs,
    outputDir: 'dist/cjs',
    extension: 'js',
  },
  {
    format: 'esm',
    inputs,
    outputDir: 'dist/esm',
    preserveModules: true,
    extension: 'mjs',
  },
  {
    format: 'esm',
    inputs: ['src/dynamicIconImports.ts', 'src/DynamicIcon.ts', ...aliasesEntries],
    outputDir: 'dist/esm',
    external: [/src/],
    preserveModules: true,
    extension: 'mjs',
    paths: (id) => {
      if (id.match(/src/)) {
        const [, modulePath] = id.match(/src\/(.*)\.ts/);

        return `./${modulePath}.mjs`;
      }
    },
  },
  {
    format: 'esm',
    inputs: ['src/dynamic.ts'],
    outputFile: 'dynamic.mjs',
    external: [/src/],
    extension: 'mjs',
    paths: (id) => {
      if (id.match(/src/)) {
        const [, modulePath] = id.match(/src\/(.*)\.ts/);

        return `dist/esm/${modulePath}.mjs`;
      }
    },
  },
];

// With `preserveModules`, every output module would get its own license banner, which
// repeats it ~2,000 times in consumer bundles (#3744). Every icon, and any direct use of
// the `Icon` component, imports `Icon`, so keeping the banner only there includes it
// exactly once in any bundle that renders an icon.
const licenseModuleMatcher = /[/\\]src[/\\]Icon\.ts$/;
const isNotLicenseChunk = (chunk) => !licenseModuleMatcher.test(chunk.facadeModuleId ?? '');

const configs = bundles
  .map(
    ({
      inputs,
      outputDir,
      outputFile,
      format,
      minify,
      preserveModules,
      entryFileNames,
      extension = 'js',
      external = [],
      paths,
    }) =>
      inputs.map((input) => ({
        input,
        plugins: [
          ...plugins({
            pkg,
            minify,
            licenseBannerExclude: preserveModules ? isNotLicenseChunk : undefined,
          }),
          // Make sure we emit "use client" directive to make it compatible with Next.js
          preserveDirectives({
            include: ['src/lucide-react.ts', 'src/DynamicIcon.ts', 'src/context.ts', 'src/Icon.ts'],
            suppressPreserveModulesWarning: true,
          }),
        ],
        external: ['react', 'prop-types', ...external],
        output: {
          name: packageName,
          ...(preserveModules
            ? {
                dir: outputDir,
                entryFileNames: entryFileNames ?? `[name].${extension}`,
              }
            : {
                file: outputFile ?? `${outputDir}/${outputFileName}.${extension}`,
              }),
          paths,
          format,
          sourcemap: true,
          preserveModules,
          preserveModulesRoot: 'src',
          globals: {
            react: 'react',
            'prop-types': 'PropTypes',
          },
        },
      })),
  )
  .flat();

export default [
  {
    input: 'src/types.ts',
    output: { file: 'dist/lucide-types.d.ts', format: 'es' },
    plugins: [dts(dtsOptions)],
  },
  {
    input: 'src/lucide-icon.d.ts',
    output: { file: 'dist/lucide-icon.d.mts', format: 'es' },
    plugins: [dts(dtsOptions)],
  },
  {
    input: 'src/dynamicIconImports.ts',
    output: [
      {
        file: `dynamicIconImports.d.ts`,
        format: 'es',
      },
      // Extra declaration file with .d.mts extension for better compatibility with ESM environments
      {
        file: `dynamicIconImports.d.mts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  {
    input: 'src/dynamic.ts',
    output: [
      {
        file: `dynamic.d.ts`,
        format: 'es',
      },
      // Extra declaration file with .d.mts extension for better compatibility with ESM environments
      {
        file: `dynamic.d.mts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  {
    input: inputs[0],
    output: [
      {
        file: `dist/${outputFileName}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(dtsOptions)],
  },
  ...configs,
];
