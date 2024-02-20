import { optimize } from 'svgo';
import * as prettier from 'prettier';
import { parseSync, stringify } from 'svgson';
import DEFAULT_ATTRS from './default-attrs.json' assert { type: 'json' };

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @param {string} path - Path to the SVG file.
 * @param {boolean} flatten - Whether to flatten SVG shapes.
 * @returns {Promise<string>} An optimized svg
 */
async function optimizeSvg(svg, path, flatten) {
  const result = optimize(svg, { path, plugins: svgoPlugins(flatten) });
  return result.data;
}

/**
 * Return SVGO plugin configurations.
 * @param {boolean} flatten - Whether to flatten SVG shapes.
 * @returns {Object[]}
 */
function svgoPlugins(flatten) {
  const convertShapeToPath = flatten && { convertArcs: true };
  const mergePaths = flatten && { force: true };

  const plugins = [
    {
      name: 'removeAttrs',
      params: { attrs: '(fill|stroke.*)' },
    },
    {
      name: 'preset-default',
      params: {
        overrides: {
          convertShapeToPath,
          mergePaths,
        },
      },
    },
  ];

  if (flatten) {
    plugins.splice(1, 0, {
      name: 'convertRectToPath',
      fn: () => {
        return {
          element: {
            enter: convertRectToPath,
          },
        };
      },
    });
  }

  return plugins;
}

function convertRectToPath(node, parentNode) {
  if (node.name != 'rect' || node.attributes.width == null || node.attributes.height == null) {
    return;
  }

  // convert rect to path
  const x = Number(node.attributes.x || '0');
  const y = Number(node.attributes.y || '0');
  const width = Number(node.attributes.width);
  const height = Number(node.attributes.height);
  const rx = Math.min(Number(node.attributes.rx || node.attributes.ry || '0'), width / 2);
  const ry = Math.min(Number(node.attributes.ry || node.attributes.rx || '0'), height / 2);
  if (Number.isNaN(x - y + width - height + rx - ry)) return;

  let pathData = '';
  if (rx == 0 || ry == 0) {
    pathData += `M${x} ${y}H${x + width}V${y + height}H${x}z`;
  } else if (rx > 0 && ry > 0) {
    pathData += `M${x + rx} ${y}`;
    pathData += `H${x + width - rx}`;
    pathData += `a${rx} ${ry} 0 0 1 ${rx} ${ry}`;
    pathData += `V${y + height - ry}`;
    pathData += `a${rx} ${ry} 0 0 1 ${-rx} ${ry}`;
    pathData += `H${x + rx}`;
    pathData += `a${rx} ${ry} 0 0 1 ${-rx} ${-ry}`;
    pathData += `V${y + ry}`;
    pathData += `a${rx} ${ry} 0 0 1 ${rx} ${-ry}`;
    pathData += 'z';
  } else {
    return;
  }
  node.name = 'path';
  node.attributes.d = pathData;
  delete node.attributes.x;
  delete node.attributes.y;
  delete node.attributes.width;
  delete node.attributes.height;
  delete node.attributes.rx;
  delete node.attributes.ry;
}

/**
 * Set default attibutes on SVG.
 * @param {string} svg - An SVG string.
 * @returns {string} An SVG string, included with the default attributes.
 */
function setAttrs(svg) {
  const contents = parseSync(svg);

  contents.attributes = DEFAULT_ATTRS;

  return stringify(contents);
}

/**
 * Process SVG string.
 * @param {string} svg An SVG string.
 * @param {string} path Path to the SVG file.
 * @param {boolean} flatten Whether to flatten SVG shapes.
 * @returns {Promise<string>} An optimized svg
 */
function processSvg(svg, path, flatten = false) {
  return (
    optimizeSvg(svg, path, flatten)
      .then(setAttrs)
      .then((optimizedSvg) => prettier.format(optimizedSvg, { parser: 'babel' }))
      // remove semicolon inserted by prettier
      // because prettier thinks it's formatting JSX not HTML
      .then((svg) => svg.replace(/;/g, ''))
  );
}

export default processSvg;
