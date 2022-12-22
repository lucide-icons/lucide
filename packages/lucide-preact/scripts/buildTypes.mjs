import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAliases } from '@lucide/build-icons';
import {
  writeFile,
  readSvgDirectory,
  resetFile,
  toPascalCase,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const srcDirectory = path.join(currentDir, '../dist');

const writeDeclarationFile = (typesFile, directory, content) => {
  resetFile(typesFile, directory);
  writeFile(content, typesFile, directory);
};

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE = 'lucide-preact.d.ts';

// Declare type definitions
let declarationFileContent = `\
/// <reference types="preact" />
import { JSX, RefObject } from 'preact'

interface LucideProps extends Partial<Omit<JSX.SVGAttributes, "ref" | "size">> {
  key?: string | number;
  ref?: string | ((component: any) => any) | RefObject<any>;
  color?: string
  size?: string | number
  strokeWidth?: string | number
}

export type LucideIcon = (props: LucideProps) => JSX.Element;

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][]

export declare const createLucideIcon: (iconName: string, iconNode: IconNode) => LucideIcon;

// Generated icons
`;

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  declarationFileContent += `export declare const ${componentName}: LucideIcon;\n`;
});

const aliases = await getAliases(ICONS_DIR);

declarationFileContent += `
// Generated icon aliases

`;

let aliasesCount = 0;

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);
  const iconAliases = aliases[iconName]?.aliases;

  declarationFileContent += `// ${componentName} aliases\n`;
  declarationFileContent += `export declare const ${componentName}Icon: LucideIcon;\n`;
  declarationFileContent += `export declare const Lucide${componentName}: LucideIcon;\n`;
  aliasesCount += 1;
  if (iconAliases != null && Array.isArray(iconAliases)) {
    iconAliases.forEach((alias) => {
      const componentNameAlias = toPascalCase(alias);
      declarationFileContent += `export declare const ${componentNameAlias}: LucideIcon;\n`;

      aliasesCount += 1;
    });
  }

  declarationFileContent += '\n';
});

writeDeclarationFile(TYPES_FILE, srcDirectory, declarationFileContent);
console.log(
  `Generated ${TYPES_FILE} file with`,
  svgFiles.length,
  'icons and with',
  aliasesCount,
  'aliases',
);
