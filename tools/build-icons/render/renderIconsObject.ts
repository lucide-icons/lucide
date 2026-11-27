import { basename } from 'path';
import { type INode, parseSync } from 'svgson';
import { generateHashedKey, readSvg, hasDuplicatedChildren } from '@lucide/helpers';

/**
 * Build an object in the format: `{ <name>: <contents> }`.
 * @param {string[]} svgFiles - A list of filenames.
 * @param {string} iconsDirectory - The directory where the icons are stored.
 * @returns {Object}
 */
export default async function generateIconObject(
  svgFiles: string[],
  iconsDirectory: string,
  renderUniqueKey = false,
) {
  const svgsContentPromises = svgFiles.map(async (svgFile) => {
    const name = basename(svgFile, '.svg');
    const svg = await readSvg(svgFile, iconsDirectory);
    const contents = parseSync(svg);

    if (!(contents.children && contents.children.length)) {
      throw new Error(`${name}.svg has no children!`);
    }

    if (hasDuplicatedChildren(contents.children)) {
      throw new Error(`Duplicated children in ${name}.svg`);
    }

    if (renderUniqueKey) {
      contents.children = contents.children.map((child) => {
        child.attributes.key = generateHashedKey(child);

        return child;
      });
    }

    return { name, contents };
  });

  const svgsContents = await Promise.all(svgsContentPromises);

  return svgsContents.reduce<Record<string, INode>>((icons, icon) => {
    icons[icon.name] = icon.contents;
    return icons;
  }, {});
}
