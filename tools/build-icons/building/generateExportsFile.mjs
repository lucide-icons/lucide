import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { toPascalCase, toCamelCase, resetFile, appendFile } from '@lucide/helpers';

export default (
  inputEntry,
  outputDirectory,
  iconNodes,
  exportModuleNameCasing,
  iconFileExtension = '',
) => {
  const fileName = path.basename(inputEntry);

  // Reset file
  resetFile(fileName, outputDirectory);

  const icons = Object.keys(iconNodes);

  // Generate Import for Icon VNodes
  icons.forEach((iconName) => {
    let componentName;

    if (exportModuleNameCasing === 'camel') {
      componentName = toCamelCase(iconName);
    } else if (exportModuleNameCasing === 'pascal') {
      componentName = toPascalCase(iconName);
    }
    const importString = `export { default as ${componentName} } from './${iconName}${iconFileExtension}';\n`;
    appendFile(importString, fileName, outputDirectory);
  });

  appendFile('\n', fileName, outputDirectory);

  console.log(`Successfully generated ${fileName} file`);
};
