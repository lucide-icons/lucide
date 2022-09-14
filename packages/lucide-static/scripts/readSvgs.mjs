/* eslint-disable import/no-extraneous-dependencies */
import { basename } from 'path';
import { readSvg } from '../../../scripts/helpers.mjs';

/**
 * Build an object in the format: `{ <name>: <contents> }`.
 * @param {string[]} svgFiles - A list of filenames.
 * @param {Function} getSvg - A function that returns the contents of an SVG file given a filename.
 * @returns {Object}
 */
export default (svgFiles, iconsDirectory) =>
  svgFiles.map(svgFile => {
    const name = basename(svgFile, '.svg');
    const contents = readSvg(svgFile, iconsDirectory);

    return { name, contents };
  });
