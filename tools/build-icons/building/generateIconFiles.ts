import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { readSvg, toPascalCase } from '@lucide/helpers';
import deprecationReasonTemplate from '../utils/deprecationReasonTemplate.ts';
import type { IconMetadata, IconNode, Path, TemplateFunction } from '../types.ts';
import { type INode } from 'svgson';

interface GenerateIconFiles {
  iconNodes: Record<string, INode>;
  outputDirectory: Path;
  template: TemplateFunction;
  showLog?: boolean;
  iconFileExtension?: string;
  separateIconFileExport?: boolean;
  separateIconFileExportExtension?: string;
  pretty?: boolean;
  iconsDir: string;
  iconMetaData: Record<string, IconMetadata>;
}

function generateIconFiles({
  iconNodes,
  outputDirectory,
  template,
  showLog = true,
  iconFileExtension = '.js',
  separateIconFileExport = false,
  separateIconFileExportExtension,
  pretty = true,
  iconsDir,
  iconMetaData,
}: GenerateIconFiles) {
  const icons = Object.keys(iconNodes);
  const iconsDistDirectory = path.join(outputDirectory, `icons`);

  if (!fs.existsSync(iconsDistDirectory)) {
    fs.mkdirSync(iconsDistDirectory);
  }

  const writeIconFiles = icons.map(async (iconName) => {
    const location = path.join(iconsDistDirectory, `${iconName}${iconFileExtension}`);
    const componentName = toPascalCase(iconName);

    const children: IconNode = iconNodes[iconName].children.map(({ name, attributes }) => [
      name,
      attributes,
    ]);

    const getSvg = () => readSvg(`${iconName}.svg`, iconsDir);
    const {
      deprecated = false,
      toBeRemovedInVersion = undefined,
      aliases = [],
    } = iconMetaData[iconName];
    const deprecationReason = deprecated
      ? deprecationReasonTemplate(iconMetaData[iconName].deprecationReason ?? '', {
          componentName,
          iconName,
          toBeRemovedInVersion,
        })
      : '';

    const iconData = {
      name: iconName,
      size: 24,
      node: children,
      ...((aliases?.length ?? 0) > 0 && {
        aliases: aliases.map((alias) => (typeof alias === 'string' ? alias : alias.name)),
      }),
    };
    const elementTemplate = await template({
      componentName,
      iconName,
      children,
      getSvg,
      deprecated,
      deprecationReason,
      iconData,
    });

    const output = pretty
      ? await prettier.format(elementTemplate, {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          parser: 'babel',
        })
      : elementTemplate;

    await fs.promises.writeFile(location, output, 'utf-8');

    if (separateIconFileExport) {
      const output = `export { default } from "./${iconName}${iconFileExtension}";\n`;
      const location = path.join(
        iconsDistDirectory,
        `${iconName}${separateIconFileExportExtension ?? iconFileExtension}`
      );

      await fs.promises.writeFile(location, output, 'utf-8');
    }
  });

  return Promise.all(writeIconFiles)
    .then(() => {
      if (showLog) {
        console.log('Successfully built', icons.length, 'icons.');
      }
    })
    .catch((error) => {
      throw new Error(`Something went wrong generating icon files,\n ${error}`);
    });
}

export default generateIconFiles;
