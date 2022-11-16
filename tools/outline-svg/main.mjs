import { promises as fs } from 'fs';
import outlineStroke from 'svg-outline-stroke';
import { parse, stringify } from 'svgson';
import getArgumentOptions from 'minimist';
import path from 'path';

const inputDir = path.join(process.cwd(), '../../icons');
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir = 'outlined' } = cliArguments;
const targetDir = path.join(process.cwd(), '../../', outputDir);

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

async function init() {
  console.time('icon outliner');
  try {
    try {
      await fs.mkdir(targetDir);
    } catch (error) {} // eslint-disable-line no-empty

    const icons = (await fs.readdir(inputDir)).filter((file) => path.extname(file) === '.svg');
    const parsedIconNodes = await Promise.all(
      icons.map(async (file) => {
        const inputFilePath = path.resolve(process.cwd(), inputDir, file);
        const iconContent = await fs.readFile(inputFilePath);
        const iconNode = await parse(iconContent.toString(), {
          transformNode: transformForward,
        });
        return [file, iconNode];
      }),
    );

    await Promise.all(
      parsedIconNodes.map(async ([file, iconNode]) => {
        const outlined = await outlineStroke(stringify(iconNode));
        const outlinedWithoutAttrs = await parse(outlined, {
          transformNode: transformBackwards,
        });

        const filePath = path.join(targetDir, file);
        await fs.writeFile(filePath, stringify(outlinedWithoutAttrs));
      }),
    );

    console.timeEnd('icon outliner');
  } catch (err) {
    console.log(err);
  }
}

init();
