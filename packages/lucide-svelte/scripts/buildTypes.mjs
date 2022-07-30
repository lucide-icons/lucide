import path from 'path';
import {
  writeFile,
  readSvgDirectory,
  resetFile,
  toPascalCase,
  appendFile,
  getCurrentDirPath
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)
const srcDirectory = path.join(currentDir, '../dist');

// Declare type definitions
const typeDefinitions = `\
/// <reference types="svelte" />
/// <reference types="svelte2tsx/svelte-jsx" />
import { SvelteComponentTyped } from "svelte";

interface IconProps extends Partial<svelte.JSX.SVGProps<SVGSVGElement>> {
  color?: string
  size?: number,
  strokeWidth?: number,
  class?: string
}

interface IconEvents {
  [evt: string]: CustomEvent<any>;
}

export type Icon = SvelteComponentTyped<IconProps, IconEvents, {}>

// Generated icons
`;

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE = 'lucide-svelte.d.ts';

resetFile(TYPES_FILE, srcDirectory);
writeFile(typeDefinitions, TYPES_FILE, srcDirectory);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  const exportTypeString = `export declare class ${componentName} extends SvelteComponentTyped<IconProps, IconEvents, {}> {}\n`;
  appendFile(exportTypeString, TYPES_FILE, srcDirectory);
});

console.log(`Generated ${TYPES_FILE} file with`, svgFiles.length, 'icons');
