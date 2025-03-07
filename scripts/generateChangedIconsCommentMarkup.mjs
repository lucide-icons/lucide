import fs from 'fs';
import path from 'path';
import { parseSync } from 'svgson';
import {
  shuffleArray,
  readSvgDirectory,
  getCurrentDirPath,
  minifySvg,
  toPascalCase,
} from '../tools/build-helpers/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const BASE_URL = 'https://lucide.dev/api/gh-icon';

const changedFilesPathString = process.env.CHANGED_FILES;

if (changedFilesPathString == null) {
  console.error('CHANGED_FILES env variable is not set');
  process.exit(1);
}

const changedFiles = changedFilesPathString
  .split(' ')
  .filter((file) => file.includes('.svg'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);

if (changedFiles.length === 0) {
  console.log('No changed icons found');
  process.exit(0);
}

const getImageTagsByFiles = (files, getBaseUrl, width) =>
  files.map((file) => {
    const svgContent = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
    const strippedAttrsSVG = svgContent.replace(/<svg[^>]*>/, '<svg>');
    const minifiedSvg = minifySvg(strippedAttrsSVG);

    const base64 = Buffer.from(minifiedSvg).toString('base64');
    const url = getBaseUrl(file);
    const widthAttr = width ? `width="${width}"` : '';

    return `<img title="${file}" alt="${file}" ${widthAttr} src="${url}/${base64}.svg"/>`;
  });

const svgFiles = await readSvgDirectory(ICONS_DIR);
const svgFilePaths = svgFiles.map((file) => `icons/${file}`);

const iconsFilteredByName = (search) => svgFilePaths.filter((file) => file.includes(search));

const cohesionRandomImageTags = getImageTagsByFiles(
  shuffleArray(svgFilePaths).slice(0, changedFiles.length),
  () => `${BASE_URL}/stroke-width/2`,
).join('');

const cohesionSquaresImageTags = getImageTagsByFiles(
  shuffleArray(iconsFilteredByName('square')).slice(0, changedFiles.length),
  () => `${BASE_URL}/stroke-width/2`,
).join('');

const changeFiles1pxStrokeImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/stroke-width/1`,
).join('');

const changeFiles2pxStrokeImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/stroke-width/2`,
).join('');

const changeFiles3pxStrokeImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/stroke-width/3`,
).join('');

const changeFilesLowDPIImageTags = getImageTagsByFiles(
  changedFiles,
  () => `${BASE_URL}/dpi/24`,
).join(' ');

const changeFilesXRayImageTags = getImageTagsByFiles(
  changedFiles,
  (file) => {
    const iconName = path.basename(file, '.svg');

    return `${BASE_URL}/${iconName}`;
  },
  400,
).join(' ');

const changeFilesDiffImageTags = getImageTagsByFiles(
  changedFiles,
  (file) => {
    const iconName = path.basename(file, '.svg');

    return `${BASE_URL}/diff/${iconName}`;
  },
  400,
).join(' ');

const readyToUseCode = changedFiles
  .map((changedFile) => {
    const svgContent = fs.readFileSync(path.join(process.cwd(), changedFile), 'utf-8');
    const name = path.basename(changedFile, '.svg');
    return `const ${toPascalCase(name)}Icon = createLucideIcon('${toPascalCase(name)}', [
  ${parseSync(svgContent)
    .children.map(({ name, attributes }) => JSON.stringify([name, attributes]))
    .join(',\n  ')}
])`;
  })
  .join('\n\n');

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
<details>
<summary>Icon Diffs</summary>
${changeFilesDiffImageTags}
</details>
<details>
<summary>Icons as code</summary>

Works for: \`lucide-react\`, \`lucide-react-native\`, \`lucide-preact\`, \`lucide-vue-next\`
\`\`\`ts
${readyToUseCode}
\`\`\`

</details>`;

console.log(commentMarkup);
