import { generateComponentName, resetFile, writeFile} from './helpers';

export default function(fileName, outputDirectory, componentGetter, iconVNodesObject) {
  // Reset file
  resetFile(fileName, outputDirectory);

  // Import the component getter
  writeFile(`import ${componentGetter} from './src/getters/${componentGetter}';\n\n`, fileName, outputDirectory);

  const icons = Object.keys(iconVNodesObject);

  // Generate Import for Icon VNodes
  icons.forEach(iconName => {
    const componentName = generateComponentName(iconName);
    const importString = `import ${componentName}VNode from './icons';\n`;
    writeFile(importString, fileName, outputDirectory);
  });

  writeFile('\n', fileName, outputDirectory);

  // Generate export for all the icons
  //
  // output: export const myIcon = getComponent(myIconVNode);
  icons.forEach(iconName => {
    const componentName = generateComponentName(iconName);
    const constantString = `export const ${componentName} = ${componentGetter}(${componentName}VNode);\n`;
    writeFile(constantString, fileName, outputDirectory);
  });

  console.log(`Successfully generated ${fileName} file`);
}
