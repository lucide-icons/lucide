import path from 'path';

import { readSvgDirectory, resetFile, appendFile, toPascalCase } from '../../../scripts/helpers';
import defaultAttributes from '../src/defaultAttributes';

const TARGET_DIR = path.join(__dirname, '../dist');
const ICONS_DIR = path.resolve(__dirname, '../../../icons');
const TYPES_FILE_NAME = 'lucide-vue-next.d.ts';

// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
import { Component } from 'vue';
declare module 'lucide-vue-next'

// Create interface extending SVGAttributes
export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(defaultAttributes, null, 2)}

// Generated icons
`;

resetFile(TYPES_FILE_NAME, TARGET_DIR);
appendFile(typeDefinitions, TYPES_FILE_NAME, TARGET_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const nameSvg = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(nameSvg);

  appendFile(
    `export declare const ${componentName}: (props: SVGProps) => Component;\n`,
    TYPES_FILE_NAME,
    TARGET_DIR,
  );
});

console.log(`Generated ${TYPES_FILE_NAME} file with`, svgFiles.length, 'icons');
