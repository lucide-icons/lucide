import fs from 'fs';
import path from 'path';
import { shuffle, readSvgDirectory, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');

const changedFilesPathString =
  'icons/airplay.svg icons/podcast.svg icons/radio-tower.svg icons/radio.svg';

// const changedFiles =process.env.CHANGED_FILES
const changedFiles = changedFilesPathString
  .split(' ')
  .map((file) => file.replace('.json', '.svg'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);

const getImageTagsByFiles = (files, url) =>
  files
    .map((file) => {
      let svg = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
      svg = svg.replace(/<svg[^>]*>/, '<svg>').replaceAll(/\n| {2}|\t/g, '');

      const base64 = Buffer.from(svg).toString('base64');

      return `<img title="${file}" alt="${file}" src="${url}/${base64}.svg"/>`;
    })
    .join('\n');

const svgFiles = readSvgDirectory(ICONS_DIR);

const iconsFilteredByName = (search) => svgFiles.filter((file) => file.includes(search));

const changeFilesImageTags = getImageTagsByFiles(
  changedFiles,
  'https://lucide.dev/api/gh-icon/stroke-width/2',
);
const cohesionRandomImageTags = getImageTagsByFiles(
  shuffle(svgFiles).slice(0, 10),
  'https://lucide.dev/api/gh-icon/stroke-width/2',
);
const cohesionSquaresImageTags = getImageTagsByFiles(
  iconsFilteredByName('square'),
  'https://lucide.dev/api/gh-icon/stroke-width/2',
);

console.log(changeFilesImageTags);
// console.log(`\
// ### Added or changed icons
// ${ changeFilesImageTags }<br/>
// <details>
// <summary>Preview cohesion</summary>
// ${ steps.generate-cohesion-check-squares.outputs.body }<br/>
// ${ steps.generate-2px-stroke-width.outputs.body }<br/>
// ${ steps.generate-cohesion-check-random.outputs.body }<br/>
// </details>
// <details>
// <summary>Preview stroke widths</summary>
// ${ steps.generate-1px-stroke-width.outputs.body }<br/>
// ${ steps.generate-2px-stroke-width.outputs.body }<br/>
// ${ steps.generate-3px-stroke-width.outputs.body }<br/>
// </details>
// <details>
// <summary>DPI Preview (24px)</summary>
// ${ steps.generate-24px-dpi-preview.outputs.body }<br/>
// </details>
// <details>
// <summary>Icon X-rays</summary>
// ${ steps.generate-x-rays.outputs.body }
// </details>
// `)
