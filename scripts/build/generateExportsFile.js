import path from 'path';

import { toPascalCase, resetFile, appendFile } from '../helpers';

export default function(inputEntry, outputDirectory, iconNodes) {
  const fileName = path.basename(inputEntry);

  // Reset file
  resetFile(fileName, outputDirectory);

  const icons = Object.keys(iconNodes);

  // Generate Import for Icon VNodes
  icons.forEach(iconName => {
    const componentName = toPascalCase(iconName);
    const importString = `export { default as ${componentName} } from './${iconName}';\n`;
    appendFile(importString, fileName, outputDirectory);
  });

  appendFile('\n', fileName, outputDirectory);

  console.log(`Successfully generated ${fileName} file`);
}
