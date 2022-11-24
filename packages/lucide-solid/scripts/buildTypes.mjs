import path from 'path';
import {
  writeFile,
  readSvgDirectory,
  resetFile,
  toPascalCase,
  appendFile,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const srcDirectory = path.join(currentDir, '../dist');

// Declare type definitions
const typeDefinitions = `\
/// <reference types="solid-js" />
import { JSX } from 'solid-js'

interface LucideProps extends Partial<JSX.IntrinsicElements & JSX.SvgSVGAttributes<SVGSVGElement>> {
  key?: string | number;
  color?: string
  size?: string | number
  strokeWidth?: string | number
  class?: string
}

export type LucideIcon = (props: LucideProps) => JSX.Element;

// Generated icons
`;

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE = 'lucide-solid.d.ts';

resetFile(TYPES_FILE, srcDirectory);
writeFile(typeDefinitions, TYPES_FILE, srcDirectory);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  const exportTypeString = `export declare const ${componentName}: LucideIcon;\n`;
  appendFile(exportTypeString, TYPES_FILE, srcDirectory);
});

console.log(`Generated ${TYPES_FILE} file with`, svgFiles.length, 'icons');
