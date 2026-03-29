import fs from 'fs';
import path from 'path';
import { parseSync, stringify } from 'svgson';

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

export const getOriginalSvg = (iconName: string, aliasNames?: string[]) => {
  const svgContent = fs.readFileSync(path.join(ICONS_DIR, `${iconName}.svg`), 'utf8');
  const svgParsed = parseSync(svgContent);

  if (aliasNames) {
    svgParsed.attributes['class'] =
      `lucide lucide-${iconName} ${aliasNames.map((alias) => `lucide-${alias}`).join(' ')}`;
  }

  return stringify(svgParsed, { selfClose: false });
};

export const removeKeys = (svg: string) => svg.replaceAll(/ key="[^"]+"/g, '');
