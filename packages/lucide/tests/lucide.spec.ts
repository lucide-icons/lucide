import { describe, it, expect } from 'vitest';
import { createIcons, icons } from '../src/lucide';
import { getOriginalSvg } from './helpers';

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

  it('should only execute given provided context', () => {
    document.body.innerHTML = `<div id="context"><i data-lucide="volume-2"></i></div><i data-lucide="funnel"></i>`;

    const context = document.querySelector('#context')!;
    createIcons({
      icons,
      root: context,
    });

    const hasSvg = !!document.querySelector('svg.lucide-volume-2');
    const hasUnreplaced = !!document.querySelector('i[data-lucide="funnel"]');

    expect(hasSvg).toBeTruthy();
    expect(hasUnreplaced).toBeTruthy();
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

  it('should not replace icons inside template elements by default', () => {
    document.body.innerHTML = `<template><i data-lucide="house"></i></template>`;

    createIcons({ icons });
    const hasIcon = !!document.querySelector('template')?.content.querySelector('svg');
    expect(hasIcon).toBeFalsy();
  });

  it('should replace icons inside template elements when replaceInsideTemplates is true', () => {
    document.body.innerHTML = `<template><i data-lucide="house"></i></template>`;

    createIcons({ icons, inTemplates: true });
    const hasIcon = !!document.querySelector('template')?.content.querySelector('svg');
    expect(hasIcon).toBeTruthy();
  });
});
