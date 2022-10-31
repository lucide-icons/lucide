import path from 'path';

import {
  readSvgDirectory,
  appendFile,
  writeFile,
  toPascalCase,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);

const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
};

const TARGET_DIR = path.join(currentDir, '../dist');
const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE_NAME = 'lucide.d.ts';

// Generates header of d.ts file include some types and functions
const typeDefinitions = `\
declare module 'lucide'

export interface SVGProps extends Partial<SVGElement> ${JSON.stringify(defaultAttributes, null, 2)}

export declare type IconNodeChild = readonly [string, object];
export declare type IconNode = readonly [tag: string, attrs: SVGProps, children?: IconNodeChild[]];
export declare type CustomAttrs = { [attr:string]: any }
export type Icons = { [key: string]: IconNode }

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
  attrs?: CustomAttrs;
}

export function createElement(icon: IconNode): SVGSVGElement;
export function createIcons(options: CreateIconsOptions): void;

export declare const icons: Icons;

// Generated icons
`;

writeFile(typeDefinitions, TYPES_FILE_NAME, TARGET_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const nameSvg = path.basename(svgFile, '.svg');
  const namePascal = toPascalCase(nameSvg);

  appendFile(`export declare const ${namePascal}: IconNode;\n`, TYPES_FILE_NAME, TARGET_DIR);
});

console.log(`Generated ${TYPES_FILE_NAME} file with`, svgFiles.length, 'icons');
