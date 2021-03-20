import fs from 'fs';
import path from 'path';
import {
  writeFile,
  readSvgDirectory,
  resetFile,
  toPascalCase,
  appendFile,
} from '../../../scripts/helpers';

const srcDirectory = path.join(__dirname, 'dist');

// Declare type definitions
const typeDefinitions = `
/// <reference types="react" />
import { SVGAttributes } from 'react'

// Create interface extending SVGAttributes
export interface LucideProps extends Partial<React.SVGProps<SVGSVGElement>> {
    color?: string
    size?: string | number
    stroke?: string | number
    strokeWidth?: string | number
}

// Generated icons
`;

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

resetFile('index.d.ts', srcDirectory);
writeFile(typeDefinitions, 'index.d.ts', srcDirectory);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  const exportTypeString = `export declare const ${componentName}: (props: LucideProps) => JSX.Element;\n`;
  appendFile(typeDefinitions, 'index.d.ts', exportTypeString);
});

console.log('Generated index.d.ts file with', svgFiles.length, 'icons');
