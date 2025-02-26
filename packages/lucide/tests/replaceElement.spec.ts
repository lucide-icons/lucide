import { describe, it, expect } from 'vitest';
import { getAttrs, getClassNames, combineClassNames } from '../src/replaceElement';

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

describe('combineClassNames', () => {
  it('should returns a string of classNames', () => {
    const arrayOfClassnames: (string | Record<string, string[]>)[] = [
      'item',
      {
        class: ['item1', 'item2', 'item3'],
      },
      {
        class: ['item4', 'item5', 'item6'],
      },
      {
        class: ['item7', 'item8', 'item9'],
      },
    ];

    const combinedClassNames = combineClassNames(arrayOfClassnames);

    expect(combinedClassNames).toMatchSnapshot();
  });
});
