import path from 'path';
import {
  readSvgDirectory,
  resetFile,
  toPascalCase,
  writeFile,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const srcDirectory = path.join(currentDir, '../dist');

const writeDeclarationFiles = (typesFile, directory, content) => {
  resetFile(typesFile, directory);
  writeFile(content, typesFile, directory);
};

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const MAIN_TYPES_FILE = 'lucide-react.d.ts';
const ICONS_TYPES_FILE = 'icons.d.ts';
const PROPS_TYPES_FILE = 'props.d.ts';

writeDeclarationFiles(
  MAIN_TYPES_FILE,
  srcDirectory,
  `\
/// <reference types="react" />
import { FC } from 'react'
import { LucideProps } from './props';

declare module 'lucide-react'

export declare const createReactComponent: (iconName: string, iconNode: any[]) => (props: LucideProps) => JSX.Element;

export type Icon = FC<LucideProps>;
`,
);

console.log(`Generated ${MAIN_TYPES_FILE} file`);

writeDeclarationFiles(
  PROPS_TYPES_FILE,
  srcDirectory,
  `\
/// <reference types="react" />
import { SVGAttributes, FC, SVGProps } from 'react'

// Create interface extending SVGProps
export interface LucideProps extends Partial<SVGProps<SVGSVGElement>> {
    size?: string | number
}
`,
);

console.log(`Generated ${PROPS_TYPES_FILE} file`);

let iconsFileExports = `\
import { LucideProps } from './props';

// Generated icon
`;
const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  iconsFileExports += `export declare const ${componentName}: (props: LucideProps) => JSX.Element;\n`;
});

writeDeclarationFiles(ICONS_TYPES_FILE, srcDirectory, iconsFileExports);

console.log(`Generated ${ICONS_TYPES_FILE} file with`, svgFiles.length, 'icons');
