import { writeFile } from '@lucide/helpers';
import { type SVGFile } from './readSvgs.mts';

export default async function generateIconNodes(parsedSvgs: SVGFile[], packageDir: string) {
  const iconNodes = parsedSvgs.reduce((acc, { name, parsedSvg }) => {
    acc[name] = parsedSvg.children.map(({ name, attributes }) => [name, attributes]);

    return acc;
  }, {} as Record<string, [string, Record<string, unknown> | undefined][]>);

  const iconNodesStringified = JSON.stringify(iconNodes, null, 2);

  await writeFile(iconNodesStringified, 'icon-nodes.json', packageDir);
}
