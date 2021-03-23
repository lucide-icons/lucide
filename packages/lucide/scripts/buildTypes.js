import path from 'path';

import { readSvgDirectory, resetFile, appendFile, toPascalCase } from '../../../scripts/helpers';

const TARGET_DIR = path.join(__dirname, '../dist');
const ICONS_DIR = path.resolve(__dirname, '../../../icons');
const TYPES_FILE_NAME = 'lucide.d.ts';

// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
export type IconName = string;
export type IconNode = readonly [tag: string, object:SVGProps<SVGSVGElement>, children:IconNode?];
export type IconsObj = { [IconName]: IconNode }

export interface Attributes extends Partial<Props<Element>> {}

export function createElement(icon: IconNode): SVGSVGElement;
export function createIcons({ icons: IconsObj, nameAttr: string = 'icon-name', attrs: Attributes = {} }): VoidFunction;

export declare const icons: IconsObj;

// Generated icons
`;

resetFile(TYPES_FILE_NAME, TARGET_DIR);
appendFile(typeDefinitions, TYPES_FILE_NAME, TARGET_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const nameSvg = path.basename(svgFile, '.svg');
  const namePascal = toPascalCase(nameSvg);

  appendFile(`export declare const ${namePascal}: IconNode;\n`, TYPES_FILE_NAME, TARGET_DIR);
});

console.log(`Generated ${TYPES_FILE_NAME} file with`, svgFiles.length, 'icons');
