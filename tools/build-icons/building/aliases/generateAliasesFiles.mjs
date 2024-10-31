import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toPascalCase, resetFile, appendFile } from '@lucide/helpers';
import deprecationReasonTemplate from '../../utils/deprecationReasonTemplate.mjs';
import getExportString from './getExportString.mjs';

export default async function generateAliasesFiles({
  iconNodes,
  outputDirectory,
  fileExtension,
  iconFileExtension = '.js',
  iconMetaData,
  aliasImportFileExtension,
  aliasNamesOnly = false,
  separateAliasesFile = false,
  showLog = true,
}) {
  const iconsDistDirectory = path.join(outputDirectory, `icons`);
  const icons = Object.keys(iconNodes);

  const destinationDirectory = path.join(outputDirectory, 'aliases');

  const aliasFileName = path.basename(`aliases${fileExtension}`);
  const aliasPrefixesFileName = path.basename(`prefixed${fileExtension}`);
  const aliasSuffixFileName = path.basename(`suffixed${fileExtension}`);

  if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory);
  }

  // Reset files
  resetFile(aliasFileName, destinationDirectory);

  if (!aliasNamesOnly) {
    resetFile(aliasPrefixesFileName, destinationDirectory);
    resetFile(aliasSuffixFileName, destinationDirectory);
  }

  // Generate Import for Icon VNodes
  await Promise.all(
    icons.map(async (iconName, index) => {
      const componentName = toPascalCase(iconName);
      const iconAliases = iconMetaData[iconName]?.aliases?.map((alias) => {
        if (typeof alias === 'string') {
          return {
            name: alias,
            deprecated: false,
          };
        }
        return alias;
      });

      let aliasFileContent = '';
      let aliasPrefixesFileContent = '';
      let aliasSuffixFileContent = '';

      if ((iconAliases != null && Array.isArray(iconAliases)) || !aliasNamesOnly) {
        if (index > 0 && aliasPrefixesFileContent !== '') {
          aliasPrefixesFileContent += '\n';
        }

        if (index > 0 && aliasSuffixFileContent !== '') {
          aliasSuffixFileContent += '\n';
        }

        if (!aliasNamesOnly) {
          aliasPrefixesFileContent += `// ${componentName} aliases\n`;
          aliasSuffixFileContent += `// ${componentName} aliases\n`;
        }
      }

      if (!aliasNamesOnly) {
        aliasSuffixFileContent += getExportString(
          `${componentName}Icon`,
          iconName,
          aliasImportFileExtension,
        );
        aliasPrefixesFileContent += getExportString(
          `Lucide${componentName}`,
          iconName,
          aliasImportFileExtension,
        );
      }

      if (iconAliases != null && Array.isArray(iconAliases)) {
        await Promise.all(
          iconAliases.map(async (alias) => {
            const componentNameAlias = toPascalCase(alias.name);
            const deprecationReason = alias.deprecated
              ? deprecationReasonTemplate(alias.deprecationReason, {
                  componentName: toPascalCase(iconName),
                  iconName,
                  toBeRemovedInVersion: alias.toBeRemovedInVersion,
                })
              : '';

            if (separateAliasesFile) {
              const output = `export { default } from "./${iconName}"`;
              const location = path.join(iconsDistDirectory, `${alias.name}${iconFileExtension}`);

              await fs.promises.writeFile(location, output, 'utf-8');
            }

            // Don't import the same icon twice
            if (componentName === componentNameAlias) {
              return;
            }

            const exportFileIcon = separateAliasesFile ? alias.name : iconName;

            if (index > 0) {
              aliasFileContent += '\n';
            }

            aliasFileContent += `// ${componentName} aliases\n`;
            aliasFileContent += getExportString(
              componentNameAlias,
              exportFileIcon,
              aliasImportFileExtension,
              alias.deprecated,
              deprecationReason,
            );

            if (!aliasNamesOnly) {
              aliasSuffixFileContent += getExportString(
                `${componentNameAlias}Icon`,
                exportFileIcon,
                aliasImportFileExtension,
                alias.deprecated,
                deprecationReason,
              );

              aliasPrefixesFileContent += getExportString(
                `Lucide${componentNameAlias}`,
                exportFileIcon,
                aliasImportFileExtension,
                alias.deprecated,
                deprecationReason,
              );
            }
          }),
        );
      }

      appendFile(aliasFileContent, aliasFileName, destinationDirectory);

      if (!aliasNamesOnly) {
        appendFile(aliasPrefixesFileContent, aliasPrefixesFileName, destinationDirectory);
        appendFile(aliasSuffixFileContent, aliasSuffixFileName, destinationDirectory);
      }
    }),
  );

  appendFile('\n', aliasFileName, destinationDirectory);

  if (!aliasNamesOnly) {
    appendFile('\n', aliasPrefixesFileName, destinationDirectory);
    appendFile('\n', aliasSuffixFileName, destinationDirectory);
  }

  if (showLog) {
    console.log(`Successfully generated src/aliases/${aliasFileName} file`);
    console.log(`Successfully generated src/aliases/${aliasPrefixesFileName} file`);
    console.log(`Successfully generated src/aliases/${aliasSuffixFileName} file`);
  }
}
