import fs from 'fs';
import path from 'path';
import { parseSync, stringify } from 'svgson';

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

export const getOriginalSvg = (iconName: string, aliasName?: string, setAttrs = true) => {
  const svgContent = fs.readFileSync(path.join(ICONS_DIR, `${iconName}.svg`), 'utf8');
  const svgParsed = parseSync(svgContent);

  if (setAttrs) {
    svgParsed.attributes['data-lucide'] = aliasName ?? iconName;
    svgParsed.attributes['class'] = `lucide lucide-${aliasName ?? iconName}`;
  }

  return stringify(svgParsed, { selfClose: false });
};
