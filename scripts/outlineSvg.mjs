import { promises as fs } from 'fs';
import outlineStroke from 'svg-outline-stroke';
import { parse, stringify } from 'svgson'; // eslint-disable-line import/no-extraneous-dependencies
import getArgumentOptions from 'minimist';

const inputDir = `./icons/`;
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir } = cliArguments;

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
    await fs.mkdir(`./${outputDir}`);

    const icons = await fs.readdir(inputDir);
    const parsedIconNodes = await Promise.all(
      icons.map(async file => {
        const iconContent = await fs.readFile(`${inputDir}${file}`);
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

        await fs.writeFile(`./${outputDir}/${file}`, stringify(outlinedWithoutAttrs));
      }),
    );

    console.timeEnd('icon outliner');
  } catch (err) {
    console.log(err);
  }
}

init();
