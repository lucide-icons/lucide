import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { generateComponentName } from './helpers';

export default function(iconVNodesObject) {

  const icons = Object.keys(iconVNodesObject);

  icons.forEach(icon => {
    const location = path.join(process.cwd(), "src/icons", `${icon}.js`);
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
