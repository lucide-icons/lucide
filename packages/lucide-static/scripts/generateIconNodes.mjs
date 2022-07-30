import { writeFile } from '../../../scripts/helpers.mjs';

export default function generateIconNodes(parsedSvgs, packageDir) {
  const iconNodes = parsedSvgs.reduce((acc, { name, parsedSvg }) => {
    acc[name] = parsedSvg.children.map(({ name, attributes }) => [name, attributes]);

    return acc;
  }, {});

  const iconNodesStringified = JSON.stringify(iconNodes, null, 2);

  writeFile(iconNodesStringified, 'icon-nodes.json', packageDir);
}
