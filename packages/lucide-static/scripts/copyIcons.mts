import { writeFile } from 'fs/promises';
import { existsSync, unlinkSync, mkdirSync } from 'fs';
import { type SVGFile } from './readSvgs.mts';

export default async function copyIcons(
  parsedSvgs: SVGFile[],
  packageDir: string,
  license: string
) {
  const iconsDirectory = `${packageDir}/icons`;

  if (existsSync(iconsDirectory)) {
    unlinkSync(iconsDirectory);
  }

  if (!existsSync(iconsDirectory)) {
    mkdirSync(iconsDirectory);
  }
  // eslint-disable-next-line arrow-body-style
  const writeIconPromises = parsedSvgs.map(({ name, contents }) => {
    let content = `<!-- ${license} -->\n${contents}`;
    content = content.replace('<svg', `<svg\n  class="lucide lucide-${name}"`);

    return writeFile(`${iconsDirectory}/${name}.svg`, content);
  });

  await Promise.all(writeIconPromises);
}
