import path from 'path';

import { generateComponentName, resetFile, writeFile, readFile } from './helpers';

export default function(inputEntry, outputDirectory, componentGetter, iconNodes) {
  const fileName = path.basename(inputEntry);

  // Reset file
  resetFile(fileName, outputDirectory);

  const icons = Object.keys(iconNodes);

  // Generate Import for Icon VNodes
  icons.forEach(iconName => {
    const componentName = generateComponentName(iconName);
    const importString = `export { default as ${componentName} } from './${iconName}';\n`;
    writeFile(importString, fileName, outputDirectory);
  });

  writeFile('\n', fileName, outputDirectory);

  console.log(`Successfully generated ${fileName} file`);
}
