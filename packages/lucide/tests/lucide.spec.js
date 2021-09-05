import * as icons from '../src/icons';
import { createIcons } from '../src/lucide';
import fs from 'fs';
import path from 'path';
import { parseSync, stringify } from 'svgson';

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

const getOriginalSvg = (iconName) => {
  const svgContent = fs.readFileSync(path.join(ICONS_DIR, `${iconName}.svg`), 'utf8');
  const svgParsed = parseSync(svgContent);

  svgParsed.attributes['icon-name'] = iconName;
  svgParsed.attributes['class'] = 'lucide';

  return stringify(svgParsed, { selfClose: false });
};

describe('createIcons', () => {
  it('should read elements from DOM and replace it with icons', () => {
    document.body.innerHTML = `<i icon-name="volume-2"></i>`;

    createIcons({icons});

    const svg = getOriginalSvg('volume-2');

    expect(document.body.innerHTML).toBe(svg)
    expect(document.body.innerHTML).toMatchSnapshot()
  });

  it('should customize the name attribute', () => {
    document.body.innerHTML = `<i custom-name="volume-2"></i>`;

    createIcons({
      icons,
      nameAttr: 'custom-name'
    });

    const hasSvg = !!document.querySelector('svg');

    expect(hasSvg).toBeTruthy()
  });

  it('should add custom attributes', () => {
    document.body.innerHTML = `<i icon-name="volume-2" class="lucide"></i>`;

    const attrs = {
      class: 'lucide icon custom-class',
      fill: 'black',
    };

    createIcons({ icons, attrs });

    const element = document.querySelector('svg');
    const attributes = element.getAttributeNames();

    const attributesAndValues = attributes.reduce((acc, item) => {
      acc[item] = element.getAttribute(item);

      return acc;
    },{})

    expect(document.body.innerHTML).toMatchSnapshot();

    expect(attributesAndValues).toEqual(expect.objectContaining(attrs));
  });
});
