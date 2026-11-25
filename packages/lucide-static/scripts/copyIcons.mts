import { writeFile } from 'fs/promises';
import { existsSync, unlinkSync, mkdirSync } from 'fs';
import { type SVGFile } from './readSvgs.mts';

function compactSvgTags(svg: string) {
  // Preserve text nodes, comments, and quoted attribute values.
  return svg.replace(
    /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[A-Za-z_](?:[^<>"']|"[^"]*"|'[^']*')*>/g,
    (tag) => {
      if (tag.startsWith('<!') || tag.startsWith('<?')) {
        return tag;
      }
      return tag.replace(/("[^"]*"|'[^']*')|[ \t\r\n]+(\/?>)?/g, (_, quoted, close) => quoted ?? close ?? ' ');
    },
  );
}

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
   
  const writeIconPromises = parsedSvgs.map(({ name, contents }) => {
    let content = `<!-- ${license} -->\n${contents}`;
    content = content.replace('<svg', `<svg\n  class="lucide lucide-${name}"`);

    return writeFile(`${iconsDirectory}/${name}.svg`, compactSvgTags(content));
  });

  await Promise.all(writeIconPromises);
}
