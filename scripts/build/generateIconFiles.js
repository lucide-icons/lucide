/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { toPascalCase } from '../helpers';

export default function(iconNode, outputDirectory, template, { showLog = true }) {
  const icons = Object.keys(iconNode);
  const iconsDistDirectory = path.join(outputDirectory, `icons`);

  if (!fs.existsSync(iconsDistDirectory)) {
    fs.mkdirSync(iconsDistDirectory);
  }

  icons.forEach(iconName => {
    const location = path.join(iconsDistDirectory, `${iconName}.js`);
    const componentName = toPascalCase(iconName);

    const children = iconNode[iconName];

    const elementTemplate = template({ componentName, iconName, children });

    fs.writeFileSync(location, prettier.format(elementTemplate, { singleQuote: true, trailingComma: 'all', parser: 'babel' }), 'utf-8');

    if(showLog) {
      console.log('Successfully built', componentName);
    }
  });
}
