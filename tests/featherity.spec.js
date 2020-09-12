import * as icons from './icons';
import { createIcons } from '../src/featherity';
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
});
