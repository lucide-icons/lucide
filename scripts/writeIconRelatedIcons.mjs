import fs from 'fs';
import path from 'path';
import { readSvgDirectory } from './helpers.mjs';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const svgFiles = readSvgDirectory(ICONS_DIR, '.json');

const location = path.resolve(currentDir, '.vitepress/data', 'relatedIcons.json');

if (fs.existsSync(location)) {
  fs.unlinkSync(location);
}

const nameWeight = 5;
const tagWeight = 4;
const categoryWeight = 3;

const arrayMatches = (a, b) => {
  // let matches = 0;
  // for (let i = 0; i < a.length; ++i) {
  //   if (b.indexOf(a[i]) != -1) {
  //     matches++;
  //   }
  // }
  // return matches;
  return a.filter(item => b.includes(item)).length;
}

const nameParts = (icon) => [icon.name, ...icon.aliases ?? []]
    .join('-')
    .split('-')
    .filter(word => word.length > 2)

const getRelatedIcons = (currentIcon, icons) => {
  const iconSimilarity = (item) =>
    nameWeight * arrayMatches(nameParts(item), nameParts(currentIcon))
    + categoryWeight * arrayMatches(item.categories, currentIcon.categories)
    + tagWeight * arrayMatches(item.tags, currentIcon.tags)
  ;
  return icons
    .filter(i => i.name !== currentIcon.name)
    .map(icon => ({icon, similarity: iconSimilarity(icon)}))
    .filter(a => a.similarity > 0) // @todo: maybe require a minimal non-zero similarity
    .sort((a, b) => b.similarity - a.similarity)
    .map(i => i.icon)
    ;
}

const iconsMetaDataPromises = svgFiles.map(async (iconName) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const metaData = await import(`../icons/${iconName}`, {
    assert: { type: 'json' }
  });

  const name = iconName.replace('.json', '');

  return {
    name,
    ...metaData.default
  };
});

const iconsMetaData = await Promise.all(iconsMetaDataPromises);

const relatedIcons = iconsMetaData.map(icon => {
  const iconRelatedIcons = getRelatedIcons(icon, iconsMetaData);
  return [icon.name, iconRelatedIcons.map(i => i.name)];
});

fs.promises
  .writeFile(location, JSON.stringify(Object.fromEntries(relatedIcons), null, 2), 'utf-8')
  .then(() => {
    console.log('Successfully written relatedIcons.json file');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating iconNode files,\n ${error}`);
  });
