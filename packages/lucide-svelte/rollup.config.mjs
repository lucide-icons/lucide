/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import pkg from './package.json' assert { type: 'json' };
import plugins from '@lucide/rollup-plugins';
import resolve from '@rollup/plugin-node-resolve';
import svelteConfig from './svelte.config.js';

const packageName = 'LucideSvelte';
const outputFileName = 'lucide-svelte';
const outputDir = 'dist';
const inputs = ['./src/lucide-svelte.ts'];
const bundles = [
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  {
    format: 'svelte',
    inputs,
    outputDir,
    preserveModules: true,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules, preserveModulesRoot }) =>
    inputs.map(input => ({
      input,
      plugins: [
        ...(format !== 'svelte' ? [
          svelte({
            ...svelteConfig,
            include: 'src/**/*.svelte',
            compilerOptions: {
              dev: false,
              css: 'external',
              hydratable: true,
            },
            emitCss: false,
          }),
          resolve({
            browser: true,
            exportConditions: ['svelte'],
            extensions: ['.svelte']
          }),
        ] : []),
        ...plugins(pkg, minify),
      ],
      external: format === 'svelte' ? [/\.svelte/] : ['svelte', 'svelte/internal'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
            }),
        preserveModules,
        preserveModulesRoot,
        format: format === 'svelte' ? 'esm' : format,
        sourcemap: true,
        globals: {
          svelte: 'svelte',
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('node_modules')) {
            const [pathToReplace, directory] = chunkInfo.name.match(/.*\/([^\/]+)\//);
            const fileName = chunkInfo.name.replace(pathToReplace, '');

            return `external/${directory}/${fileName}.js`;
          }

          return '[name].js';
        }
      },
    })),
  )
  .flat();

export default configs;
