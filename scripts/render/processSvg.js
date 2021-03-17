/* eslint-disable import/no-extraneous-dependencies */
import Svgo from 'svgo';
import { format } from 'prettier';
import { parseSync, stringify } from 'svgson';
import DEFAULT_ATTRS from './default-attrs.json';

/**
 * Process SVG string.
 * @param {string} svg - An SVG string.
 * @param {Promise<string>}
 */
function processSvg(svg) {
  return (
    optimize(svg)
      .then(setAttrs)
      .then(optimizedSvg => format(optimizedSvg, { parser: 'babel' }))
      // remove semicolon inserted by prettier
      // because prettier thinks it's formatting JSX not HTML
      .then(svg => svg.replace(/;/g, ''))
  );
}

/**
 * Optimize SVG with `svgo`.
 * @param {string} svg - An SVG string.
 * @returns {Promise<string>}
 */
function optimize(svg) {
  const svgo = new Svgo({
    plugins: [
      { convertShapeToPath: false },
      { mergePaths: false },
      { removeAttrs: { attrs: '(fill|stroke.*)' } },
      { removeTitle: true },
    ],
  });

  return svgo.optimize(svg).then(({ data }) => data);
}

/**
 * Set default attibutes on SVG.
 * @param {string} svg - An SVG string.
 * @returns {string}
 */
function setAttrs(svg) {
  const contents = parseSync(svg);

  contents.attributes = DEFAULT_ATTRS;

  return stringify(contents);
}

export default processSvg;
