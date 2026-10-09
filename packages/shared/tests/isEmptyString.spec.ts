import { describe, it, expect } from 'vitest';
import { isEmptyString } from '../src/utils/isEmptyString';

describe('isEmptyString', () => {
  it('should return true for an empty string', () => {
    expect(isEmptyString('')).toBe(true);
  });

  it('should return false for a non-empty string', () => {
    expect(isEmptyString('hello')).toBe(false);
    expect(isEmptyString(' ')).toBe(false);
    expect(isEmptyString('0')).toBe(false);
  });

  it('should return false for null', () => {
    expect(isEmptyString(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isEmptyString(undefined)).toBe(false);
  });

  it('should return false for numbers', () => {
    expect(isEmptyString(0)).toBe(false);
    expect(isEmptyString(123)).toBe(false);
    expect(isEmptyString(NaN)).toBe(false);
  });

  it('should return false for objects', () => {
    expect(isEmptyString({})).toBe(false);
    expect(isEmptyString([])).toBe(false);
  });

  it('should return false for boolean values', () => {
    expect(isEmptyString(true)).toBe(false);
    expect(isEmptyString(false)).toBe(false);
  });

  it('should return false for symbols', () => {
    expect(isEmptyString(Symbol())).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isEmptyString(() => {})).toBe(false);
  });
});
