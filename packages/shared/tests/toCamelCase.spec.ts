import { describe, it, expect } from 'vitest';
import { toCamelCase } from '../src/utils/toCamelCase';

describe('toCamelCase', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
    expect(toCamelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  it('should convert snake_case to camelCase', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
    expect(toCamelCase('foo_bar_baz')).toBe('fooBarBaz');
  });

  it('should convert space separated to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
    expect(toCamelCase('foo bar baz')).toBe('fooBarBaz');
  });

  it('should handle mixed separators', () => {
    expect(toCamelCase('hello-world_foo bar')).toBe('helloWorldFooBar');
  });

  it('should lowercase the first character if uppercase', () => {
    expect(toCamelCase('HelloWorld')).toBe('helloWorld');
    expect(toCamelCase('Hello-World')).toBe('helloWorld');
  });

  it('should return the same string if already camelCase', () => {
    expect(toCamelCase('alreadyCamelCase')).toBe('alreadyCamelCase');
  });

  it('should handle single word', () => {
    expect(toCamelCase('word')).toBe('word');
    expect(toCamelCase('Word')).toBe('word');
  });

  it('should handle empty string', () => {
    expect(toCamelCase('')).toBe('');
  });
});
