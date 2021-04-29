import path from 'path';
import {
  writeFile,
  readSvgDirectory,
  resetFile,
  toPascalCase,
  appendFile,
} from '../../../scripts/helpers';

const srcDirectory = path.join(__dirname, '../dist');

// Declare type definitions
const typeDefinitions = `\
/// <reference types="preact" />
import { JSX, VNode } from 'preact'

interface SVGProps extends Omit<Omit<JSX.SVGAttributes, 'ref'>, 'size'> {
  key?: string | number;
  ref?: string | ((component: any) => any);
}

// Create interface extending SVGAttributes
export interface LucideProps extends Partial<SVGProps> {
    color?: string
    size?: string | number
}

// Generated icons
`;

const ICONS_DIR = path.resolve(__dirname, '../../../icons');
const TYPES_FILE = 'lucide-preact.d.ts';

resetFile(TYPES_FILE, srcDirectory);
writeFile(typeDefinitions, TYPES_FILE, srcDirectory);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  const exportTypeString = `export declare const ${componentName}: (props: LucideProps) => JSX.Element;\n`;
  appendFile(exportTypeString, TYPES_FILE, srcDirectory);
});

console.log(`Generated ${TYPES_FILE} file with`, svgFiles.length, 'icons');
