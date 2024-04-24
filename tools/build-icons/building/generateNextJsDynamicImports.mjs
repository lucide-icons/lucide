import path from 'path';
import { resetFile, appendFile } from '../../../scripts/helpers.mjs';

export default function generateNextJsDynamicImports({
  iconNodes,
  outputDirectory,
  fileExtension,
  showLog = true,
}) {
  const fileName = path.basename(`nextjsDynamicIconImports${fileExtension}`);
  const icons = Object.keys(iconNodes);

  // Reset file
  resetFile(fileName, outputDirectory);

  let importString = `import dynamic from "next/dynamic";\n\nconst nextjsDynamicIconImports$ = {\n`;

  // Generate Import for Icon VNodes
  icons.forEach((iconName) => {
    importString += `  '${iconName}': dynamic(() => import('./icons/${iconName}')),\n`;
  });

  importString += '};\nexport default nextjsDynamicIconImports$;\n';

  appendFile(importString, fileName, outputDirectory);

  if (showLog) {
    console.log(`Successfully generated ${fileName} file`);
  }
}
