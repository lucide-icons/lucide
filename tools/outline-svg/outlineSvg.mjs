import { promises as fs } from 'fs';
import path from 'path';
import outlineStroke from 'svg-outline-stroke';
import { parse, stringify } from 'svgson';

function transformForward(node) {
  if (node.name === 'svg') {
    return {
      ...node,
      attributes: {
        ...node.attributes,
        width: 960,
        height: 960,
      },
    };
  }
  return node;
}

function transformBackwards(node) {
  if (node.name === 'svg') {
    const { width, height, ...attributes } = node.attributes;
    return {
      ...node,
      attributes,
    };
  }
  return node;
}

export default async function outlineSvg({ inputDir, file, targetDir }) {
  const inputFilePath = path.resolve(process.cwd(), inputDir, file);
  const iconContent = await fs.readFile(inputFilePath);
  const iconNode = await parse(iconContent.toString(), {
    transformNode: transformForward,
  });

  const outlined = await outlineStroke(stringify(iconNode));
  const outlinedWithoutAttrs = await parse(outlined, {
    transformNode: transformBackwards,
  });

  const filePath = path.join(targetDir, file);
  await fs.writeFile(filePath, stringify(outlinedWithoutAttrs));
}
