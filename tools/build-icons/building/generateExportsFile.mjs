import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { toPascalCase, toCamelCase, resetFile, appendFile } from '@lucide/helpers';

export default async function generateExportFile(
  inputEntry,
  outputDirectory,
  iconNodes,
  exportModuleNameCasing,
  iconFileExtension = '',
) {
  const fileName = path.basename(inputEntry);

  // Reset file
  await resetFile(fileName, outputDirectory);

  const icons = Object.keys(iconNodes);

  // Generate Import for Icon VNodes
  const iconImportNodesPromises = icons.map(async (iconName) => {
    let componentName;

    if (exportModuleNameCasing === 'camel') {
      componentName = toCamelCase(iconName);
    } else if (exportModuleNameCasing === 'pascal') {
      componentName = toPascalCase(iconName);
    }
    const importString = `export { default as ${componentName} } from './${iconName}${iconFileExtension}';\n`;
    return appendFile(importString, fileName, outputDirectory);
  });

  await Promise.all(iconImportNodesPromises);

  await appendFile('\n', fileName, outputDirectory);

  console.log(`Successfully generated ${fileName} file`);
}
