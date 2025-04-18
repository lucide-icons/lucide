/* eslint-disable import/no-extraneous-dependencies */
import { basename } from 'path';
import { readSvg } from '@lucide/helpers';

/**
 * Build an object in the format: `{ <name>: <contents> }`.
 * @param {string[]} svgFiles - A list of filenames.
 * @param {Function} getSvg - A function that returns the contents of an SVG file given a filename.
 * @returns {Object}
 */
export default function readSVGs(svgFiles, iconsDirectory) {
  const SVGReadPromises = svgFiles.map(async (svgFile) => {
    const name = basename(svgFile, '.svg');
    const contents = await readSvg(svgFile, iconsDirectory);

    return { name, contents };
  });

  return Promise.all(SVGReadPromises);
}
