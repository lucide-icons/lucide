
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

import { generateComponentName } from './helpers';

const FILE_NAME = "react.js";

const resetFile = fs.writeFileSync(path.join(process.cwd(), FILE_NAME), "", "utf-8");
const writeFile = (content) => fs.appendFileSync(
  path.join(process.cwd(), FILE_NAME),
  content,
  "utf-8"
);

export default function(iconVNodesObject) {

  writeFile();
  writeFile(`import getReactComponent from './src/getReactComponent';\n`);

  // const componentName = generateComponentName(icon);
  const icons = Object.keys(iconVNodesObject);

  // icons.forEach(iconName => {
  //   const constantString = `const ${componentName} = getReactComponent();\n`;
  //   const exportString = `export ${componentName};\n`;


  // });

  // icons.forEach(iconName => {
  //   const constantString = `const ${componentName} = getReactComponent();\n`;
  //   const exportString = `export ${componentName};\n`;


  // });

  const exportStringNames = icons.map(iconName => generateComponentName(iconName)).join(",\n");
  const exportString = `export { ${exportStringNames} };\n`;

  writeFile(exportString);
}
