import path from 'path';
import { toPascalCase, resetFile, appendFile } from '../../../scripts/helpers.mjs';

const getImportString = (componentName, iconName, aliasImportFileExtension = '') =>
  `export { default as ${componentName} } from './icons/${iconName}${aliasImportFileExtension}';\n`;

export default function generateAliasesFile({
  iconNodes,
  outputDirectory,
  fileExtension,
  aliases,
  aliasImportFileExtension,
  showLog = true,
}) {
  const fileName = path.basename(`aliases${fileExtension}`);
  const icons = Object.keys(iconNodes);

  // Reset file
  resetFile(fileName, outputDirectory);

  // Generate Import for Icon VNodes
  icons.forEach((iconName) => {
    const componentName = toPascalCase(iconName);
    const iconAliases = aliases[iconName]?.aliases;

    let importString = `// ${componentName} aliases\n`;

    importString += getImportString(`${componentName}Icon`, iconName, aliasImportFileExtension);
    importString += getImportString(`Lucide${componentName}`, iconName, aliasImportFileExtension);

    if (iconAliases != null && Array.isArray(iconAliases)) {
      iconAliases.forEach((alias) => {
        const componentNameAlias = toPascalCase(alias);
        importString += getImportString(componentNameAlias, iconName, aliasImportFileExtension);
      });
    }

    importString += '\n';

    appendFile(importString, fileName, outputDirectory);
  });

  appendFile('\n', fileName, outputDirectory);

  if (showLog) {
    console.log(`Successfully generated ${fileName} file`);
  }
}
