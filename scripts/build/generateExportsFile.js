import path from 'path';

import { generateComponentName, resetFile, writeFile, readFile } from './helpers';

export default function(inputEntry, outputDirectory, componentGetter, iconNodes) {
  const fileName = path.basename(inputEntry);
  // Reset file
  resetFile(fileName, outputDirectory);

  // const content = readFile(inputEntry);
  // writeFile(content, fileName, outputDirectory);

  const icons = Object.keys(iconNodes);

  // Generate Import for Icon VNodes
  icons.forEach(iconName => {
    const componentName = generateComponentName(iconName);
    const importString = `export { default as ${componentName} } from './${iconName}';\n`;
    writeFile(importString, fileName, outputDirectory);
  });

  writeFile('\n', fileName, outputDirectory);

  // Generate export for all the icons
  //
  // (output): export const myIcon = getComponent(myIconVNode);
  // icons.forEach(iconName => {
  //   const componentName = generateComponentName(iconName);
  //   const constantString = `export const ${componentName} = ${componentGetter}('${componentName}', ${componentName}Node);\n`;
  //   writeFile(constantString, fileName, outputDirectory);
  // });

  console.log(`Successfully generated ${fileName} file`);
}
