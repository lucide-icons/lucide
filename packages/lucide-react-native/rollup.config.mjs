import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import plugins from '@lucide/rollup-plugins';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const packageName = 'LucideReact';
const outputFileName = 'lucide-react-native';
const outputDir = 'dist';
const inputs = ['src/lucide-react-native.ts', 'src/icons/index.ts'];

const generateIconDeclarationFiles = () => ({
  name: 'generate-icon-declaration-files',
  writeBundle() {
    const iconDeclarationsDir = new URL('./dist/esm/icons/', import.meta.url);
    mkdirSync(iconDeclarationsDir, { recursive: true });

    const iconIndex = readFileSync(new URL('./src/icons/index.ts', import.meta.url), 'utf8');
    Array.from(
      iconIndex.matchAll(/export \{ default as ([A-Za-z0-9_$]+) \} from '\.\/([^']+)';/g),
    ).forEach(([, componentName, fileName]) => {
      writeFileSync(
        new URL(`./${fileName}.d.ts`, iconDeclarationsDir),
        `export { ${componentName} as default } from '../../icons';\n`,
      );
    });
  },
});

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

const configs = bundles
  .map(({ inputs, outputDir, format, preserveModules, extension = 'js' }) =>
    inputs.map((input) => ({
      input,
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
  {
    input: inputs[1],
    output: [
      {
        file: `dist/icons.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts(), generateIconDeclarationFiles()],
  },
  {
    input: `src/${outputFileName}.suffixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.suffixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  {
    input: `src/${outputFileName}.prefixed.ts`,
    output: [
      {
        file: `dist/${outputFileName}.prefixed.d.ts`,
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
  ...configs,
];
