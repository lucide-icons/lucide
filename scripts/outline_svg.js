const { promises: fs } = require("fs");
const outlineStroke = require("svg-outline-stroke");
const { parse, stringify } = require("svgson");

const inputDir = `./icons/`;
const outputDir = `./converted_icons/`;

async function init() {
  try {
    const files = await fs.readdir(inputDir);
    for (let file of files) {
      const icon = await fs.readFile(`${inputDir}${file}`);
      const scaled = await parse(icon.toString(), {
        transformNode: transformForward
      });
      const outlined = await outlineStroke(stringify(scaled));
      const outlinedWithoutAttrs = await parse(outlined, {
        transformNode: transformBackwards
      });
      await fs.writeFile(
        `${outputDir}${file}`,
        stringify(outlinedWithoutAttrs)
      );
    }
  } catch (err) {
    console.log(err);
  }
}

init();

function transformForward(node) {
  if (node.name === "svg") {
    return {
      ...node,
      attributes: {
        ...node.attributes,
        width: 800,
        height: 800
      }
    };
  }
  return node;
}

function transformBackwards(node) {
  if (node.name === "svg") {
    const { width, height, ...attributes } = node.attributes;
    return {
      ...node,
      attributes
    };
  }
  return node;
}
