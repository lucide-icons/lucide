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
    expect(toKebabCase('test123String')).toBe('test-123-string');
  });

  it('should handle already kebab-case strings', () => {
    expect(toKebabCase('already-kebab-case')).toBe('already-kebab-case');
  });

  it('should handle single lowercase word', () => {
    expect(toKebabCase('word')).toBe('word');
  });

  it('should handle consecutive capital letters such as single-letter icon prefixes and mixed numbers', () => {
    expect(toKebabCase('AArrowDown')).toBe('a-arrow-down');
    expect(toKebabCase('AArrowUp')).toBe('a-arrow-up');
    expect(toKebabCase('ALargeSmall')).toBe('a-large-small');
    expect(toKebabCase('XLineTop')).toBe('x-line-top');
    expect(toKebabCase('Grid3X3')).toBe('grid-3x3');
    expect(toKebabCase('Grid3x3')).toBe('grid-3x3');
    expect(toKebabCase('Grid2X2Plus')).toBe('grid-2x2-plus');
    expect(toKebabCase('ArrowDownAZ')).toBe('arrow-down-a-z');
    expect(toKebabCase('ArrowDown01')).toBe('arrow-down-01');
    expect(toKebabCase('Clock12')).toBe('clock-12');
  });

  it('should handle empty string', () => {
    expect(toKebabCase('')).toBe('');
  });
});
