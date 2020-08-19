/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { generateComponentName } from './helpers';

export default function(iconNode, outputDirectory, template) {
  const icons = Object.keys(iconNode);
  const iconsDistDirectory = path.join(outputDirectory, `icons`);

  if (!fs.existsSync(iconsDistDirectory)) {
    fs.mkdirSync(iconsDistDirectory);
  }

  icons.forEach(icon => {
    const location = path.join(iconsDistDirectory, `${icon}.js`);
    const componentName = generateComponentName(icon);

    const node = JSON.stringify(iconNode[icon]);

    const elementTemplate = template({ componentName, node });

    fs.writeFileSync(location, prettier.format(elementTemplate, { parser: 'babel' }), 'utf-8');

    console.log('Successfully built', componentName);
  });
}
