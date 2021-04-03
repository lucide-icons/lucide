import path from 'path';

import { readSvgDirectory, resetFile, appendFile, toPascalCase } from '../../../scripts/helpers';

const TARGET_DIR = path.join(__dirname, '../dist');
const ICONS_DIR = path.resolve(__dirname, '../../../icons');
const TYPES_FILE_NAME = 'lucide.d.ts';
import defaultAttributes from '../src/defaultAttributes';
// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(defaultAttributes, null, 2)}

export declare type IconNode = readonly [string, object];
export declare type IconData = readonly [tag: string, object: object, children: IconNode[]];
export type Icons = { [key: string]: IconData }

export interface CreateIconsOptions {
  /**
   * List of icons you want to replace
   * 
   * For example: \`{ Menu, Circle}\`.
   * 
   * For replace all icons in lucide library, import \`icons\` and use it.
   */
  icons: Icons;

  /**
   * Search HTML emelemt by \`nameAttr\` property.
   * 
   * For example if define \`<i lucide-icon="circle"></i>\`, fill by \`lucide-icon\`.
   *
   * @default 'icon-name'
   */
  nameAttr?: string;

  /**
   * Change defult attribute for show like color, fill, width , ...
   *
   * @default undefined
   */
  attrs?: Attributes;
}

export function createElement(icon: IconData): SVGSVGElement;
export function createIcons(options: CreateIconsOptions): VoidFunction;

export declare const icons: Icons;

// Generated icons
`;

resetFile(TYPES_FILE_NAME, TARGET_DIR);
appendFile(typeDefinitions, TYPES_FILE_NAME, TARGET_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach(svgFile => {
  const nameSvg = path.basename(svgFile, '.svg');
  const namePascal = toPascalCase(nameSvg);

  appendFile(`export declare const ${namePascal}: IconData;\n`, TYPES_FILE_NAME, TARGET_DIR);
});

console.log(`Generated ${TYPES_FILE_NAME} file with`, svgFiles.length, 'icons');
