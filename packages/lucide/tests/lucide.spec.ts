import { describe, it, expect } from 'vitest';
import { createIcons, icons } from '../src/lucide';
import fs from 'fs';
import path from 'path';
import { parseSync, stringify } from 'svgson';

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

const getOriginalSvg = (iconName: string, aliasName?: string) => {
  const svgContent = fs.readFileSync(path.join(ICONS_DIR, `${iconName}.svg`), 'utf8');
  const svgParsed = parseSync(svgContent);

  svgParsed.attributes['data-lucide'] = aliasName ?? iconName;
  svgParsed.attributes['class'] = `lucide lucide-${aliasName ?? iconName}`;

  return stringify(svgParsed, { selfClose: false });
};

describe('createIcons', () => {
  it('should read elements from DOM and replace it with icons', () => {
    document.body.innerHTML = `<i data-lucide="volume-2"></i>`;

    createIcons({ icons });

    const svg = getOriginalSvg('volume-2');

    expect(document.body.innerHTML).toBe(svg);
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('should customize the name attribute', () => {
    document.body.innerHTML = `<i data-custom-name="volume-2"></i>`;

    createIcons({
      icons,
      nameAttr: 'data-custom-name',
    });

    const hasSvg = !!document.querySelector('svg');

    expect(hasSvg).toBeTruthy();
  });

  it('should add custom attributes', () => {
    document.body.innerHTML = `<i data-lucide="volume-2" class="lucide"></i>`;

    const attrs = {
      class: 'lucide lucide-volume-2 icon custom-class',
      fill: 'black',
    };

    createIcons({ icons, attrs });

    const element = document.querySelector('svg') as SVGSVGElement;
    const attributes = element.getAttributeNames();

    const attributesAndValues = attributes.reduce(
      (acc, item) => {
        acc[item] = element.getAttribute(item);

        return acc;
      },
      {} as Record<string, string | null>,
    );

    expect(document.body.innerHTML).toMatchSnapshot();

    expect(attributesAndValues).toEqual(expect.objectContaining(attrs));
  });

  it('should inherit elements attributes', () => {
    document.body.innerHTML = `<i data-lucide="sun" data-theme-switcher="light"></i>`;

    const attrs = {
      'data-theme-switcher': 'light',
    };

    createIcons({ icons });

    const element = document.querySelector('svg') as SVGSVGElement;
    const attributes = element.getAttributeNames();

    const attributesAndValues = attributes.reduce(
      (acc, item) => {
        acc[item] = element.getAttribute(item);

        return acc;
      },
      {} as Record<string, string | null>,
    );

    expect(attributesAndValues).toEqual(expect.objectContaining(attrs));
  });

  it('should read elements from DOM and replace icon with alias name', () => {
    document.body.innerHTML = `<i data-lucide="grid"></i>`;

    createIcons({ icons });

    const svg = getOriginalSvg('grid-3x3', 'grid');

    expect(document.body.innerHTML).toBe(svg);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
