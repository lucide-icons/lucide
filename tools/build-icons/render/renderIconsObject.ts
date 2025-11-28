import { basename } from 'path';
import { type INode, parseSync } from 'svgson';
import { generateHashedKey, readSvg, hasDuplicatedChildren } from '@lucide/helpers';

/**
 * Check if the children of an SVG have duplicated items.
 * @param {INode} contents - The SVG contents.
 * @param {string} name - The name of the SVG file.
 * @throws {Error} If there are duplicated children.
 */
function checkForDuplicatedChildren(
  contents: INode,
  name: string,
) {
  if (hasDuplicatedChildren(contents.children)) {
    throw new Error(`Duplicated children in ${name}.svg`);
  }

  for (const child of contents.children) {
    checkForDuplicatedChildren(child, name);
  }
}

/**
 * Generate unique keys for each child.
 * @param {INode} contents - The SVG contents.
 * @returns {INode[]}
 */
function generateUniqueKeys(contents: INode): INode[] {
  return contents.children.map((child) => {
    child.attributes.key = generateHashedKey(child);
    child.children = generateUniqueKeys(child);

    return child;
  });
}

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

    checkForDuplicatedChildren(contents, name);

    if (renderUniqueKey) {
      contents.children = generateUniqueKeys(contents);
    }

    return { name, contents };
  });

  const svgsContents = await Promise.all(svgsContentPromises);

  return svgsContents.reduce<Record<string, INode>>((icons, icon) => {
    icons[icon.name] = icon.contents;
    return icons;
  }, {});
}
