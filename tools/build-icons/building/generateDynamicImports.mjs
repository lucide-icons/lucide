import path from 'path';
import { resetFile, appendFile } from '@lucide/helpers';

export default function generateDynamicImports({
  iconNodes,
  outputDirectory,
  fileExtension,
  iconMetaData,
  showLog = true,
}) {
  const fileName = path.basename(`dynamicIconImports${fileExtension}`);
  const icons = Object.keys(iconNodes);

  // Reset file
  resetFile(fileName, outputDirectory);

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

  appendFile(importString, fileName, outputDirectory);

  if (showLog) {
    console.log(`Successfully generated ${fileName} file`);
  }
}
