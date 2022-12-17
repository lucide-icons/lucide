import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAliases } from '@lucide/build-icons';
import {
  readSvgDirectory,
  resetFile,
  toPascalCase,
  writeFile,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const srcDirectory = path.join(currentDir, '../dist');

const writeDeclarationFile = (typesFile, directory, content) => {
  resetFile(typesFile, directory);
  writeFile(content, typesFile, directory);
};

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const MAIN_TYPES_FILE = 'lucide-react.d.ts';

let declarationFileContent = `\
/// <reference types="react" />
import { SVGAttributes, FC, SVGProps } from 'react'

declare module 'lucide-react'

// Create interface extending SVGProps
export interface LucideProps extends Partial<SVGProps<SVGSVGElement>> {
    size?: string | number
}

export type LucideIcon = (props: LucideProps) => JSX.Element;

export declare const createReactComponent: (iconName: string, iconNode: any[]) => LucideIcon;

export type Icon = FC<LucideProps>;
`;

declarationFileContent += `\

// Generated icon
`;

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);

  declarationFileContent += `export declare const ${componentName}: LucideIcon;\n`;
});

console.log('aliases');
const aliases = await getAliases(ICONS_DIR);

declarationFileContent += `\n
import { LucideProps } from './props';

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

writeDeclarationFile(MAIN_TYPES_FILE, srcDirectory, declarationFileContent);
console.log(
  `Generated ${MAIN_TYPES_FILE} file with`,
  svgFiles.length,
  'icons and with',
  aliasesCount,
  'aliases',
);
