import { promises as fs } from 'fs';
import outlineStroke from 'svg-outline-stroke';
import { parse, stringify } from 'svgson'; // eslint-disable-line import/no-extraneous-dependencies
import getArgumentOptions from 'minimist';

const inputDir = `./icons/`;
const cliArguments = getArgumentOptions(process.argv.slice(2));
const { outputDir } = cliArguments;

const widthMap = {
  'converted_icons-200': '1',
  'converted_icons-300': '1.5',
  converted_icons: '2',
  'converted_icons-500': '2.5',
  'converted_icons-600': '3',
};

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

    if (widthMap?.[outputDir] === undefined) {
      throw new Error(`Could not find the directory: ${outputDir}.`)
    }

    await Promise.all(
      parsedIconNodes.map(async ([file, iconNode]) => {
        iconNode.attributes['stroke-width'] = widthMap[outputDir];
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
