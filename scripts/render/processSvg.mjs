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

  return [
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
