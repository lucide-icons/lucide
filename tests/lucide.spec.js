import * as icons from './icons';
import { createIcons } from '../src/lucide';
import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

const ICONS_DIR = path.resolve(__dirname, '../icons');

const getOriginalSvg = (iconName) => {
  const svgContent = fs.readFileSync(path.join(ICONS_DIR, `${iconName}.svg`), 'utf8');

  return minify(svgContent, { collapseWhitespace: true, keepClosingSlash: true, });
};

describe('createIcons', () => {
  it('should read elements from DOM and replace it with icons', () => {
    document.body.innerHTML = `<i icon-name="volume-2"></i>`;

    createIcons({icons});

    const svg = getOriginalSvg('volume-2');
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
    document.body.innerHTML = `<i icon-name="volume-2"></i>`;

    const attrs = {
      class: 'icon custom-class',
      fill: 'black',
    };

    createIcons({ icons, attrs });

    const element = document.querySelector('svg');
    const attributes = element.getAttributeNames();

    const attributesAndValues = attributes.reduce((acc, item) => {
      acc[item] = element.getAttribute(item);

      return acc;
    },{})

    expect(attributesAndValues).toEqual(expect.objectContaining(attrs));
  });
});
