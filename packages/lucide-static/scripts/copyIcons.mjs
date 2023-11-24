import { writeFile } from 'fs/promises';
import { existsSync, unlinkSync, mkdirSync } from 'fs';

export default async function copyIcons(parsedSvgs, packageDir, license) {
  const iconsDirectory = `${packageDir}/icons`;

  if (existsSync(iconsDirectory)) {
    unlinkSync(iconsDirectory);
  }

  if (!existsSync(iconsDirectory)) {
    mkdirSync(iconsDirectory);
  }
  // eslint-disable-next-line arrow-body-style
  const writeIconPromises = parsedSvgs.map(({ name, contents }) => {
    const content = `<!-- ${license} -->\n${contents}`;

    return writeFile(`${iconsDirectory}/${name}.svg`, content);
  });

  await Promise.all(writeIconPromises);
}
