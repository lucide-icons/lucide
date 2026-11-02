import { describe, expect, it } from 'vitest';
import { toCamelCase } from './toCamelCase.ts';

describe('toCamelCase', () => {
  it('converts kebab-case icon names', () => {
    expect(toCamelCase('arrow-up')).toBe('arrowUp');
    expect(toCamelCase('circle-arrow-out-down-left')).toBe('circleArrowOutDownLeft');
    expect(toCamelCase('arrow-up-0-1')).toBe('arrowUp01');
  });

  it('treats whitespace, hyphens and underscores as separators', () => {
    expect(toCamelCase('foo_bar')).toBe('fooBar');
    expect(toCamelCase('foo bar')).toBe('fooBar');
    expect(toCamelCase('foo\tbar')).toBe('fooBar');
    expect(toCamelCase('foo - _\tbar')).toBe('fooBar');
    expect(toCamelCase('-foo')).toBe('Foo');
  });

  it('lowercases only a leading capital letter', () => {
    expect(toCamelCase('Foo-bar')).toBe('fooBar');
    expect(toCamelCase('FooBar')).toBe('fooBar');
    expect(toCamelCase('alreadyCamelCase')).toBe('alreadyCamelCase');
  });

  it('keeps separators that are not followed by a word character', () => {
    expect(toCamelCase('foo-')).toBe('foo-');
    expect(toCamelCase('foo__')).toBe('foo__');
    expect(toCamelCase('foo\t!')).toBe('foo\t!');
    expect(toCamelCase('')).toBe('');
  });

  it('handles long runs of tabs in linear time', () => {
    const input = `a${'\t'.repeat(100_000)}!`;

    const start = performance.now();
    const result = toCamelCase(input);
    const duration = performance.now() - start;

    expect(result).toBe(input);
    expect(duration).toBeLessThan(100);
  });
});
