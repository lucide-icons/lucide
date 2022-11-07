import path from 'path';

import {
  readSvgDirectory,
  resetFile,
  appendFile,
  toPascalCase,
  getCurrentDirPath
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)

const TARGET_DIR = path.join(currentDir, '../dist');
const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE_NAME = 'lucide-vue-next.d.ts';

// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
import { SVGAttributes, FunctionalComponent } from 'vue';
declare module 'lucide-vue-next'

// Create interface extending SVGAttributes
export interface SVGProps extends Partial<SVGAttributes> {
  size?: 24 | number
}

// Generated icons
`;

resetFile(TYPES_FILE_NAME, TARGET_DIR);
appendFile(typeDefinitions, TYPES_FILE_NAME, TARGET_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const nameSvg = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(nameSvg);

  appendFile(
    `export declare const ${componentName}: (props: SVGProps) => FunctionalComponent<SVGProps>;\n`,
    TYPES_FILE_NAME,
    TARGET_DIR,
  );
});

console.log(`Generated ${TYPES_FILE_NAME} file with`, svgFiles.length, 'icons');
