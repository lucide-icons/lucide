import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toPascalCase, resetFile, appendFile } from '@lucide/helpers';
import { deprecationReasonTemplate } from '../../utils/deprecationReasonTemplate.mjs';
import getExportString from './getExportString.mjs';


export default async function generateAliasesFile({
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

  const aliasFileName = path.basename(`aliases${fileExtension}`);
  const aliasPrefixesFileName = path.basename(`aliasesPrefixes${fileExtension}`);
  const aliasSuffixFileName = path.basename(`aliasesSuffixes${fileExtension}`);

  // Reset file
  resetFile(aliasFileName, outputDirectory);
  resetFile(aliasPrefixesFileName, outputDirectory);
  resetFile(aliasSuffixFileName, outputDirectory);

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
        if (index > 0) {
          aliasFileContent += '\n';
          aliasPrefixesFileContent += '\n';
          aliasSuffixFileContent += '\n';
        }

        aliasFileContent += `// ${componentName} aliases\n`;
        aliasPrefixesFileContent += `// ${componentName} aliases\n`;
        aliasSuffixFileContent += `// ${componentName} aliases\n`;
      }

      if (!aliasNamesOnly) {
        aliasSuffixFileContent += getExportString(`${componentName}Icon`, iconName, aliasImportFileExtension);
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

      appendFile(aliasFileContent, aliasFileName, outputDirectory);
      appendFile(aliasPrefixesFileContent, aliasPrefixesFileName, outputDirectory);
      appendFile(aliasSuffixFileContent, aliasSuffixFileName, outputDirectory);
    }),
  );

  appendFile('\n', aliasFileName, outputDirectory);
  appendFile('\n', aliasPrefixesFileName, outputDirectory);
  appendFile('\n', aliasSuffixFileName, outputDirectory);

  if (showLog) {
    console.log(`Successfully generated ${aliasFileName} file`);
    console.log(`Successfully generated ${aliasPrefixesFileName} file`);
    console.log(`Successfully generated ${aliasSuffixFileName} file`);
  }
}
