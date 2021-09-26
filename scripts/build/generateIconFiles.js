/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { promises } from 'stream';
import { toPascalCase } from '../helpers';

export default function({ iconNodes, outputDirectory, template, showLog = true, iconFileExtention = '.js' }) {
  const icons = Object.keys(iconNodes);
  const iconsDistDirectory = path.join(outputDirectory, `icons`);

  if (!fs.existsSync(iconsDistDirectory)) {
    fs.mkdirSync(iconsDistDirectory);
  }

  const writeIconFiles = icons.map(async iconName => {
    const location = path.join(iconsDistDirectory, `${iconName}${iconFileExtention}`);
    const componentName = toPascalCase(iconName);

    let { children } = iconNodes[iconName];
    children = children.map(({name, attributes}) => ([name, attributes]))

    const elementTemplate = template({ componentName, iconName, children });

    await fs.promises.writeFile(location, prettier.format(elementTemplate, { singleQuote: true, trailingComma: 'all', parser: 'babel' }), 'utf-8');
  });

  Promise.all(writeIconFiles)
  .then(() => {
    if(showLog) {
      console.log('Successfully built', icons.length, 'icons.');
    }
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating icon files,\n ${error}`)
  })
}
