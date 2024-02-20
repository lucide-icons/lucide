import { describe, it, expect } from 'vitest';
import { createIcons, icons } from '../src/lucide';
import path from 'path';

const ICONS_DIR = path.resolve(__dirname, '../../../icons');

describe('createIcons', () => {
  it('should read elements from DOM and replace it with icons', () => {
    document.body.innerHTML = `<i data-lucide="volume-2"></i>`;

    createIcons({ icons });

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

    const element = document.querySelector('svg');
    const attributes = element.getAttributeNames();

    const attributesAndValues = attributes.reduce((acc, item) => {
      acc[item] = element.getAttribute(item);

      return acc;
    }, {});

    expect(document.body.innerHTML).toMatchSnapshot();

    expect(attributesAndValues).toEqual(expect.objectContaining(attrs));
  });

  it('should inherit elements attributes', () => {
    document.body.innerHTML = `<i data-lucide="sun" data-theme-switcher="light"></i>`;

    const attrs = {
      'data-theme-switcher': 'light',
    };

    createIcons({ icons });

    const element = document.querySelector('svg');
    const attributes = element.getAttributeNames();

    const attributesAndValues = attributes.reduce((acc, item) => {
      acc[item] = element.getAttribute(item);

      return acc;
    }, {});

    expect(attributesAndValues).toEqual(expect.objectContaining(attrs));
  });

  it('should read elements from DOM and replace icon with alias name', () => {
    document.body.innerHTML = `<i data-lucide="grid"></i>`;

    createIcons({ icons });

    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
