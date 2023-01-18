import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAliases } from '@lucide/build-icons';
import {
  readSvgDirectory,
  resetFile,
  writeFile,
  toPascalCase,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const targetDirectory = path.join(currentDir, '../dist');

const writeDeclarationFile = (typesFile, directory, content) => {
  resetFile(typesFile, directory);
  writeFile(content, typesFile, directory);
};

const getComponentImport = (componentName) => `export declare const ${componentName}: Icon;\n`;

const ICONS_DIR = path.resolve(currentDir, '../../../icons');
const TYPES_FILE = 'lucide-vue-next.d.ts';

// Generates header of d.ts file include some types and functions
let declarationFileContent = `\
import { SVGAttributes, FunctionalComponent } from 'vue';
declare module 'lucide-vue-next'

// Create interface extending SVGAttributes
export interface SVGProps extends Partial<SVGAttributes> {
  size?: 24 | number
}

export type Icon = (props: SVGProps) => FunctionalComponent<SVGProps>

// Generated icons
`;

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const nameSvg = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(nameSvg);

  declarationFileContent += getComponentImport(componentName);
});

const aliases = await getAliases(ICONS_DIR);

declarationFileContent += `\n

// Generated icon aliases
`;

let aliasesCount = 0;

svgFiles.forEach((svgFile) => {
  const iconName = path.basename(svgFile, '.svg');
  const componentName = toPascalCase(iconName);
  const iconAliases = aliases[iconName]?.aliases;

  declarationFileContent += `// ${componentName} aliases\n`;
  declarationFileContent += getComponentImport(`${componentName}Icon`);
  declarationFileContent += getComponentImport(`Lucide${componentName}`);

  aliasesCount += 1;
  if (iconAliases != null && Array.isArray(iconAliases)) {
    iconAliases.forEach((alias) => {
      const componentNameAlias = toPascalCase(alias);
      declarationFileContent += getComponentImport(componentNameAlias);

      aliasesCount += 1;
    });
  }

  declarationFileContent += '\n';
});

writeDeclarationFile(TYPES_FILE, targetDirectory, declarationFileContent);
console.log(
  `Generated ${TYPES_FILE} file with`,
  svgFiles.length,
  'icons and with',
  aliasesCount,
  'aliases',
);
