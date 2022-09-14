import path from 'path';

import { toPascalCase, resetFile, appendFile } from '../helpers.mjs';

export default function(inputEntry, outputDirectory, iconNodes, iconFileExtention = '') {
  const fileName = path.basename(inputEntry);

  // Reset file
  resetFile(fileName, outputDirectory);

  const icons = Object.keys(iconNodes);

  const fileExtention =
    iconFileExtention === '.ts' || iconFileExtention === '.js' ? '' : iconFileExtention;

  // Generate Import for Icon VNodes
  icons.forEach(iconName => {
    const componentName = toPascalCase(iconName);
    const importString = `export { default as ${componentName} } from './${iconName}${fileExtention}';\n`;
    appendFile(importString, fileName, outputDirectory);
  });

  appendFile('\n', fileName, outputDirectory);

  console.log(`Successfully generated ${fileName} file`);
}
