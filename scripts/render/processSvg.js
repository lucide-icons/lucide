/* eslint-disable import/no-extraneous-dependencies */
import { optimize } from 'svgo';
import { format } from 'prettier';
import { parseSync, stringify } from 'svgson';
import DEFAULT_ATTRS from './default-attrs.json';

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>} An optimized svg
 */
async function optimizeSvg(svg) {
  const result = optimize(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            convertShapeToPath: false,
            mergePaths: false,
            removeAttrs: {
              attrs: '(fill|stroke.*)',
            },
          },
        },
      },
    ],
  });

  return result.data;
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
 * @returns {Promise<string>} An optimized svg
 */
function processSvg(svg) {
  return (
    optimizeSvg(svg)
      .then(setAttrs)
      .then(optimizedSvg => format(optimizedSvg, { parser: 'babel' }))
      // remove semicolon inserted by prettier
      // because prettier thinks it's formatting JSX not HTML
      .then(svg => svg.replace(/;/g, ''))
  );
}

export default processSvg;
