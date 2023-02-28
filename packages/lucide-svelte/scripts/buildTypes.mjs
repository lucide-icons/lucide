import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAliases } from '@lucide/build-icons';
import {
  writeFile,
  readSvgDirectory,
  resetFile,
  toPascalCase,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const targetDirectory = path.join(currentDir, '../dist');

const writeDeclarationFile = (typesFile, directory, content) => {
  resetFile(typesFile, directory);
  writeFile(content, typesFile, directory);
};

const getComponentImport = (componentName) =>
  `export declare class ${componentName} extends SvelteComponentTyped<IconProps, IconEvents, {}> {}\n`;

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE = 'lucide-svelte.d.ts';

// Declare type definitions
let declarationFileContent = `\
/// <reference types="svelte" />
/// <reference types="svelte-check/dist/src/svelte-jsx" />
import { SvelteComponentTyped } from "svelte";

interface IconProps extends Partial<svelte.JSX.SVGProps<SVGSVGElement>> {
  color?: string
  size?: number|string,
  strokeWidth?: number|string,
  class?: string
}

interface IconEvents {
  [evt: string]: CustomEvent<any>;
}

export type Icon = SvelteComponentTyped<IconProps, IconEvents, {}>

// Generated icons
`;

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  declarationFileContent += getComponentImport(componentName);
});

const aliases = await getAliases(ICONS_DIR);

declarationFileContent += `\n

// Generated icon aliases
`;

let aliasesCount = 0;

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);
  const iconAliases = aliases[iconName]?.aliases;

  declarationFileContent += `// ${componentName} aliases\n`;
  declarationFileContent += getComponentImport(`${componentName}Icon`);
  declarationFileContent += getComponentImport(`Lucide${componentName}`);

  aliasesCount += 1;
  if (iconAliases != null && Array.isArray(iconAliases)) {
    iconAliases.forEach((alias) => {
      const componentNameAlias = toPascalCase(alias);
      declarationFileContent += getComponentImport(componentNameAlias);

      aliasesCount += 1;
    });
  }

  declarationFileContent += '\n';
});

writeDeclarationFile(TYPES_FILE, targetDirectory, declarationFileContent);
console.log(
  `Generated ${TYPES_FILE} file with`,
  svgFiles.length,
  'icons and with',
  aliasesCount,
  'aliases',
);
