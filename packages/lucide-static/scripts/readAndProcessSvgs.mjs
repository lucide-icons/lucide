/* eslint-disable import/no-extraneous-dependencies */
import { basename } from 'path';
import { readAndProcessSvg } from '@lucide/build-icons';

/**
 * Build an object in the format: `{ <name>: <contents> }`.
 * @param {string[]} svgFiles - A list of filenames.
 * @param {string} iconsDirectory
 * @param {boolean} flatten
 * @returns {Promise<Object[]>}
 */
export default async function readAndProcessSvgs(svgFiles, iconsDirectory, flatten) {
  const svgs = svgFiles.map(async (svgFile) => {
    const name = basename(svgFile, '.svg');
    const contents = await readAndProcessSvg(svgFile, iconsDirectory, flatten);

    return { name, contents };
  });
  return await Promise.all(svgs);
}
