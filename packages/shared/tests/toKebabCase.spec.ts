import { describe, it, expect } from 'vitest';
import { toKebabCase } from '../src/utils/toKebabCase';

describe('toKebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(toKebabCase('camelCase')).toBe('camel-case');
  });

  it('should convert PascalCase to kebab-case', () => {
    expect(toKebabCase('PascalCase')).toBe('pascal-case');
  });

  it('should handle strings with numbers', () => {
    expect(toKebabCase('test123String')).toBe('test123-string');
  });

  it('should handle already kebab-case strings', () => {
    expect(toKebabCase('already-kebab-case')).toBe('already-kebab-case');
  });

  it('should handle single lowercase word', () => {
    expect(toKebabCase('word')).toBe('word');
  });

  it('should handle consecutive capital letters such as single-letter icon prefixes', () => {
    expect(toKebabCase('AArrowDown')).toBe('a-arrow-down');
    expect(toKebabCase('AArrowUp')).toBe('a-arrow-up');
    expect(toKebabCase('ALargeSmall')).toBe('a-large-small');
    expect(toKebabCase('XLineTop')).toBe('x-line-top');
  });

  it('should handle empty string', () => {
    expect(toKebabCase('')).toBe('');
  });
});
