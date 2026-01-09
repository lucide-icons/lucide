import path from 'path';
import { babel } from '@rollup/plugin-babel';
import esbuild from 'esbuild';
import plugins from '@lucide/rollup-plugins';
import ts from 'typescript';

import pkg from './package.json' with { type: 'json' };

const packageName = 'LucideSolid';
const outputFileName = 'lucide-solid';
const outputDir = 'dist';
const inputs = ['src/lucide-solid.ts'];

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
  .map(({ inputs, outputDir, format, preserveModules }) =>
    inputs.map((input) => ({
      input,
      plugins: [
        babel({
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          babelHelpers: 'bundled',
          presets: [
            'babel-preset-solid',
            '@babel/preset-typescript',
            ['@babel/preset-env', { bugfixes: true, targets: 'last 2 years' }],
          ],
        }),
        ...plugins({
          pkg,
          withEsbuild: false,
        }),
        format === 'esm'
          ? {
              name: 'ts',
              buildEnd() {
                // Transpile typescript to './dist/source'
                esbuild.build({
                  entryPoints: ['./src/**/*.tsx', './src/**/*.ts'],
                  outdir: './dist/source',
                  outExtension: {
                    '.js': '.jsx',
                  },
                  loader: {
                    '.js': 'jsx',
                  },
                  jsx: 'preserve',
                  jsxImportSource: 'solid-js',
                  bundle: true,
                  format: 'esm',
                  sourcemap: true,
                  target: ['esnext'],
                  banner: {
                    js: `/**
* @license ${pkg.name} v${pkg.version} - ${pkg.license}
*
* This source code is licensed under the ${pkg.license} license.
* See the LICENSE file in the root directory of this source tree.
*/`,
                  },
                  plugins: [
                    {
                      name: 'externalize-everything-except-own-dependencies',
                      setup(build) {
                        build.onResolve({ filter: /(.*)/ }, (args) => {
                          const modulePath = path.join(args.resolveDir, args.path);
                          if (
                            args.kind === 'import-statement' &&
                            args.path !== '@lucide/shared' &&
                            !modulePath.includes('packages/shared')
                          ) {
                            return { path: args.path, external: true };
                          }
                        });
                      },
                    },
                  ],
                  external: ['solid-js'],
                });

                // Generate types
                const program = ts.createProgram([pkg.source], {
                  target: ts.ScriptTarget.ESNext,
                  module: ts.ModuleKind.ESNext,
                  moduleResolution: ts.ModuleResolutionKind.NodeJs,
                  jsx: ts.JsxEmit.Preserve,
                  jsxImportSource: 'solid-js',
                  allowSyntheticDefaultImports: true,
                  esModuleInterop: true,
                  declarationDir: `dist/types`,
                  declaration: true,
                  emitDeclarationOnly: true,
                });
                program.emit();
              },
            }
          : null,
      ],
      external: ['solid-js', 'solid-js/web', 'solid-js/store'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
              exports: 'auto',
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}.js`,
            }),
        format: format === 'source' ? 'esm' : format,
        preserveModules,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    })),
  )
  .flat();

export default configs;
