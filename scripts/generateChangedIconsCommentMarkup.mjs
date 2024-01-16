import fs from 'fs';
import path from 'path';
import { shuffle, readSvgDirectory, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const BASE_URL = 'https://lucide.dev/api/gh-icon';

const changedFilesPathString = process.env.CHANGED_FILES;

const changedFiles = changedFilesPathString
  .split(' ')
  .map((file) => file.replace('.json', '.svg'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);

const getImageTagsByFiles = (files, getBaseUrl, width) =>
  files
    .map((file) => {
      const svgContent = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
      const strippedAttrsSVG = svgContent
        .replace(/<svg[^>]*>/, '<svg>')
        .replaceAll(/\n| {2}|\t/g, '');

      const base64 = Buffer.from(strippedAttrsSVG).toString('base64');
      const url = getBaseUrl(file);
      const widthAttr = width ? `width="${width}"` : '';

      return `<img title="${file}" alt="${file}" ${widthAttr} src="${url}/${base64}.svg"/>`;
    })
    .join('');

const svgFiles = readSvgDirectory(ICONS_DIR).map((file) => `icons/${file}`);

const iconsFilteredByName = (search) => svgFiles.filter((file) => file.includes(search));

const cohesionRandomImageTags = getImageTagsByFiles(
  shuffle(svgFiles).slice(0, changedFiles.length),
  () => `${BASE_URL}/stroke-width/2`,
);

const cohesionSquaresImageTags = getImageTagsByFiles(
  shuffle(iconsFilteredByName('square')).slice(0, changedFiles.length),
  () => `${BASE_URL}/stroke-width/2`,
);

const changeFiles1pxStrokeImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/stroke-width/1`,
);

const changeFiles2pxStrokeImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/stroke-width/2`,
);

const changeFiles3pxStrokeImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/stroke-width/3`,
);

const changeFilesLowDPIImageTags = getImageTagsByFiles(changedFiles, () => `${BASE_URL}/dpi/24`);

const changeFilesXRayImageTags = getImageTagsByFiles(
  changedFiles,
  (file) => {
    const iconName = path.basename(file, '.svg');

    return `${BASE_URL}/${iconName}`;
  },
  400,
);

const commentMarkup = `\
### Added or changed icons
${changeFiles2pxStrokeImageTags}
<details>
<summary>Preview cohesion</summary>
${cohesionSquaresImageTags}<br/>
${changeFiles2pxStrokeImageTags}<br/>
${cohesionRandomImageTags}<br/>
</details>
<details>
<summary>Preview stroke widths</summary>
${changeFiles1pxStrokeImageTags}<br/>
${changeFiles2pxStrokeImageTags}<br/>
${changeFiles3pxStrokeImageTags}<br/>
</details>
<details>
<summary>DPI Preview (24px)</summary>
${changeFilesLowDPIImageTags}<br/>
</details>
<details>
<summary>Icon X-rays</summary>
${changeFilesXRayImageTags}
</details>
`;

console.log(commentMarkup);
