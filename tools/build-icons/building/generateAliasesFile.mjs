import path from 'path';
import { toPascalCase, resetFile, appendFile } from '../../../scripts/helpers.mjs';

export default function generateAliasesFile({
  iconNodes,
  outputDirectory,
  fileExtension,
  showLog = true,
}) {
  const fileName = path.basename(`aliases${fileExtension}`);
  const icons = Object.keys(iconNodes);

  // Reset file
  resetFile(fileName, outputDirectory);

  // Generate Import for Icon VNodes
  icons.forEach((iconName) => {
    const componentName = toPascalCase(iconName);
    const importString = `export { default as ${componentName}Icon } from './icons/${iconName}';\n\n`;
    appendFile(importString, fileName, outputDirectory);
  });

  appendFile('\n', fileName, outputDirectory);

  if (showLog) {
    console.log(`Successfully generated ${fileName} file`);
  }
}
