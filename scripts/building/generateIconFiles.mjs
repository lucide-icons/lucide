/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { toPascalCase } from '../helpers.mjs';

export default function({
  iconNodes,
  outputDirectory,
  template,
  showLog = true,
  iconFileExtention = '.js',
  pretty = true,
}) {
  const icons = Object.keys(iconNodes);
  const iconsDistDirectory = path.join(outputDirectory, `icons`);

  if (!fs.existsSync(iconsDistDirectory)) {
    fs.mkdirSync(iconsDistDirectory);
  }

  const writeIconFiles = icons.map(async iconName => {
    const location = path.join(iconsDistDirectory, `${iconName}${iconFileExtention}`);
    const componentName = toPascalCase(iconName);

    let { children } = iconNodes[iconName];
    children = children.map(({ name, attributes }) => [name, attributes]);

    const elementTemplate = template({ componentName, iconName, children });
    const output = pretty
      ? prettier.format(elementTemplate, {
          singleQuote: true,
          trailingComma: 'all',
          parser: 'babel',
        })
      : elementTemplate;

    await fs.promises.writeFile(location, output, 'utf-8');
  });

  Promise.all(writeIconFiles)
    .then(() => {
      if (showLog) {
        console.log('Successfully built', icons.length, 'icons.');
      }
    })
    .catch(error => {
      throw new Error(`Something went wrong generating icon files,\n ${error}`);
    });
}
