import { describe, it, expect } from 'vitest';
import { getAttrs, getClassNames } from '../src/replaceElement';

describe('getAtts', () => {
  it('should returns attrbrutes of an element', () => {
    const element = {
      attributes: [
        {
          name: 'class',
          value: 'item1 item2 item4',
        },
        {
          name: 'date-name',
          value: 'volume',
        },
      ],
    };

    const attrs = getAttrs(element as unknown as Element);

    expect(attrs.class).toBe(element.attributes[0].value);
  });
});

describe('getClassNames', () => {
  it('should returns an array when giving class property of string', () => {
    const elementAttrs = {
      class: 'item1 item2 item3',
    };

    const attrs = getClassNames(elementAttrs);
    expect(JSON.stringify(attrs)).toBe(JSON.stringify(['item1', 'item2', 'item3']));
  });

  it('should returns an array when givind class property with an array', () => {
    const elementAttrs = {
      class: ['item1', 'item2', 'item3'],
    };

    const attrs = getClassNames(elementAttrs);
    expect(JSON.stringify(attrs)).toBe(JSON.stringify(['item1', 'item2', 'item3']));
  });
});
