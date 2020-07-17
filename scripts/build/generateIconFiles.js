import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { generateComponentName } from './helpers';

export default function(iconVNodesObject, outputDirectory) {

  const icons = Object.keys(iconVNodesObject);
  const iconsDistDirectory = path.join(outputDirectory, `icons`);

  if (!fs.existsSync(iconsDistDirectory)){
    fs.mkdirSync(iconsDistDirectory);
  }

  icons.forEach(icon => {
    const location = path.join(iconsDistDirectory, `${icon}.js`);
    const ComponentName = generateComponentName(icon);

    const VNode = JSON.stringify(iconVNodesObject[icon]);

    const element = `
      export default [${VNode}]
    `

    fs.writeFileSync(
      location,
      prettier.format(element, { parser: "babel" }),
      "utf-8"
    );

    console.log("Successfully built", ComponentName);
  });
}
