import path from 'path';

import {
  writeFile,
  resetFile,
  appendFile,
  readSvgDirectory,
} from '../../../scripts/helpers';

const TARGET_DIR = path.join(__dirname, '../projects/lucide-angular/build');
const ICONS_DIR = path.resolve(__dirname, '../../../icons');
const TYPES_FILE_NAME = 'icons-index.ts';

// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
export type IconNode = readonly [string, object];
export type IconData = readonly [string, object, IconNode[] ];

export declare const icons: { [key: string]: IconData };

// Generated icons
`;

resetFile(TYPES_FILE_NAME, TARGET_DIR);
writeFile(typeDefinitions, TYPES_FILE_NAME, TARGET_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const kebab = path.basename(svgFile, '.svg');

  appendFile(
    `export * from './icons/${kebab}';\n`,
    TYPES_FILE_NAME,
    TARGET_DIR,
  );
});

console.log(`Generated ${TYPES_FILE_NAME} file with`, svgFiles.length, 'icons');
