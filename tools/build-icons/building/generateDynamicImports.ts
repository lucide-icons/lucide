import path from 'path';
import { resetFile, appendFile } from '@lucide/helpers';
import type { IconMetadata } from '../types.ts';
import type { INode } from 'svgson';

interface GenerateDynamicImports {
  iconNodes: Record<string, INode>;
  outputDirectory: string;
  fileExtension: string;
  iconMetaData: Record<string, IconMetadata>;
  showLog?: boolean;
}

export default async function generateDynamicImports({
  iconNodes,
  outputDirectory,
  fileExtension,
  iconMetaData,
  showLog = true,
}: GenerateDynamicImports) {
  const fileName = path.basename(`dynamicIconImports${fileExtension}`);
  const icons = Object.keys(iconNodes);

  // Reset file
  await resetFile(fileName, outputDirectory);

  let importString = `const dynamicIconImports = {\n`;

  // Generate Import for Icon VNodes
  icons.forEach((iconName) => {
    importString += `  '${iconName}': () => import('./icons/${iconName}'),\n`;

    const iconAliases = iconMetaData[iconName]?.aliases?.map((alias) => {
      if (typeof alias === 'string') {
        return alias;
      }
      return alias.name;
    });

    if (iconAliases != null && Array.isArray(iconAliases)) {
      iconAliases.forEach((alias) => {
        if (!alias) {
          return;
        }

        importString += `  '${alias}': () => import('./icons/${iconName}'),\n`;
      });
    }
  });

  importString += '};\nexport default dynamicIconImports;\n';

  await appendFile(importString, fileName, outputDirectory);

  if (showLog) {
    console.log(`Successfully generated ${fileName} file`);
  }
}
