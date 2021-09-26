import { promises as fs } from 'fs';
import outlineStroke from 'svg-outline-stroke';
import { parse, stringify } from 'svgson'; // eslint-disable-line import/no-extraneous-dependencies

const inputDir = `./icons/`;
const outputDirs = {
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
    const createDirectories = Object.keys(outputDirs).map(directory => fs.mkdir(`./${directory}`));
    await Promise.all(createDirectories);

    const icons = await fs.readdir(inputDir);
    icons.length = 20;
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
      Object.entries(outputDirs).map(async ([directory, width]) => {
        await Promise.all(
          parsedIconNodes.map(async ([file, iconNode]) => {
            iconNode.attributes['stroke-width'] = width;
            const outlined = await outlineStroke(stringify(iconNode));
            const outlinedWithoutAttrs = await parse(outlined, {
              transformNode: transformBackwards,
            });

            await fs.writeFile(`./${directory}/${file}`, stringify(outlinedWithoutAttrs));
          }),
        );
      }),
    );

    console.timeEnd('icon outliner');
  } catch (err) {
    console.log(err);
  }
}

init();
