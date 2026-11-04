import { describe, it, expect, vi } from 'vitest';
import replaceElement, { getAttrs, getClassNames } from '../src/replaceElement';
import type { IconNode } from '../src/types';

const testIconNode: IconNode = [
  ['polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }],
  ['path', { d: 'M15.54 8.46a5 5 0 0 1 0 7.07' }],
];

describe('getAttrs', () => {
  it('should return attributes of an element', () => {
    const element = {
      attributes: [
        {
          name: 'class',
          value: 'item1 item2 item4',
        },
        {
          name: 'data-name',
          value: 'volume',
        },
      ],
    };

    const attrs = getAttrs(element as unknown as Element);

    expect(attrs.class).toBe(element.attributes[0].value);
    expect(attrs['data-name']).toBe('volume');
  });
});

describe('getClassNames', () => {
  it('should return an array when given class property of string', () => {
    const elementAttrs = {
      class: 'item1 item2 item3',
    };

    const attrs = getClassNames(elementAttrs);
    expect(attrs).toEqual(['item1', 'item2', 'item3']);
  });

  it('should return an array when given class property with an array', () => {
    const elementAttrs = {
      class: ['item1', 'item2', 'item3'],
    };

    const attrs = getClassNames(elementAttrs);
    expect(attrs).toEqual(['item1', 'item2', 'item3']);
  });

  it('should return string when given a string directly', () => {
    expect(getClassNames('custom-class')).toBe('custom-class');
  });

  it('should return empty string when no class property exists', () => {
    expect(getClassNames({})).toBe('');
  });
});

describe('replaceElement', () => {
  it('should return undefined if element lacks the name attribute', () => {
    const element = document.createElement('i');
    const result = replaceElement(element, {
      nameAttr: 'data-lucide',
      icons: { Volume2: testIconNode },
      attrs: {},
    });

    expect(result).toBeUndefined();
  });

  it('should warn and return undefined when icon is not found in icons object', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const element = document.createElement('i');
    element.setAttribute('data-lucide', 'non-existent');
    document.body.appendChild(element);

    const result = replaceElement(element, {
      nameAttr: 'data-lucide',
      icons: {},
      attrs: {},
    });

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('icon name was not found in the provided icons object'),
    );
    expect(result).toBeUndefined();

    element.remove();
    warnSpy.mockRestore();
  });

  it('should replace element with svg in parentNode and forward attributes', () => {
    const container = document.createElement('div');
    const element = document.createElement('i');
    element.setAttribute('data-lucide', 'volume-2');
    element.setAttribute('class', 'custom-icon');
    container.appendChild(element);

    const replaced = replaceElement(element, {
      nameAttr: 'data-lucide',
      icons: { Volume2: testIconNode },
      attrs: { stroke: 'red' },
    });

    expect(replaced).toBe(element);
    expect(container.querySelector('i')).toBeNull();

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('data-lucide')).toBe('volume-2');
    expect(svg?.getAttribute('stroke')).toBe('red');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.classList.contains('lucide-volume-2')).toBe(true);
    expect(svg?.classList.contains('custom-icon')).toBe(true);
  });

  it('should not add aria-hidden if element has accessibility attributes', () => {
    const container = document.createElement('div');
    const element = document.createElement('i');
    element.setAttribute('data-lucide', 'volume-2');
    element.setAttribute('aria-label', 'Volume Control');
    container.appendChild(element);

    replaceElement(element, {
      nameAttr: 'data-lucide',
      icons: { Volume2: testIconNode },
      attrs: {},
    });

    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBeNull();
    expect(svg?.getAttribute('aria-label')).toBe('Volume Control');
  });

  it('should handle detached elements without parentNode gracefully', () => {
    const element = document.createElement('i');
    element.setAttribute('data-lucide', 'volume-2');

    const result = replaceElement(element, {
      nameAttr: 'data-lucide',
      icons: { Volume2: testIconNode },
      attrs: {},
    });

    expect(result).toBeUndefined();
  });
});
