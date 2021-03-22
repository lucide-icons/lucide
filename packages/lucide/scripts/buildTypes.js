import path from 'path';

import { readSvgDirectory, resetFile, appendFile, toPascalCase } from '../../../scripts/helpers';

const ICONS_DIR = path.resolve(__dirname, '../icons');
const DTS_FILE_NAME = 'index.d.ts';
const DTS_FILE_ROOT = path.resolve(__dirname, '../');

resetFile(DTS_FILE_NAME, DTS_FILE_ROOT);

// Generates header of d.ts file include some types and functions
appendFile(
  `
export type IconData = readonly [string, object, IconData?];
export type IconString = string;

export function createElement(ico: IconData): SVGSVGElement;

export declare const icons: { [key: string]: IconData };

// Generated icons
`,
  DTS_FILE_NAME,
  DTS_FILE_ROOT,
);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const nameSvg = path.basename(svgFile, '.svg');
  const namePascal = toPascalCase(nameSvg);
  appendFile(`export declare const ${namePascal}: IconData;\n`, DTS_FILE_NAME, DTS_FILE_ROOT);
});

console.log(`Successfully generated '${DTS_FILE_NAME}'.`);
