/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import cheerio from 'cheerio';
import { minify } from 'html-minifier';
import { readSvg } from '../helpers';

/**
 * Get contents between opening and closing `<svg>` tags.
 * @param {string} svg
 * @returns {string}
 */
function getSvgContents(svg) {
  const $ = cheerio.load(svg);

  return minify($('svg').html(), { collapseWhitespace: true });
}

/**
 * Build an object in the format: `{ <name>: <contents> }`.
 * @param {string[]} svgFiles - A list of filenames.
 * @param {Function} getSvg - A function that returns the contents of an SVG file given a filename.
 * @returns {Object}
 */
export default (svgFiles, iconsDirectory) =>
  svgFiles
    .map(svgFile => {
      const name = path.basename(svgFile, '.svg');
      const svg = readSvg(svgFile, iconsDirectory);
      const contents = getSvgContents(svg);
      return { name, contents };
    })
    .reduce((icons, icon) => {
      icons[icon.name] = icon.contents;
      return icons;
    }, {});
