import fs from 'fs';
import path from 'path';
import { parseSync, stringify } from 'svgson';

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

const getOriginalIconSVG = (iconName:string, aliasName:string) => {
  const svgContent = fs.readFileSync(path.join(ICONS_DIR, `${iconName}.svg`), 'utf8');
  const svgParsed = parseSync(svgContent);

  svgParsed.attributes['data-lucide'] = aliasName ?? iconName;
  svgParsed.attributes['class'] = `lucide lucide-${aliasName ?? iconName}`;

  return stringify(svgParsed, { selfClose: false });
};

export default getOriginalIconSVG;
