import { describe, it, expect } from 'vitest';
import { toPascalCase } from '../src/utils/toPascalCase';

describe('toPascalCase', () => {
  it('should convert kebab-case to PascalCase', () => {
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
  });

  it('should convert snake_case to PascalCase', () => {
    expect(toPascalCase('hello_world')).toBe('HelloWorld');
  });

  it('should convert camelCase to PascalCase', () => {
    expect(toPascalCase('helloWorld')).toBe('HelloWorld');
  });

  it('should convert already PascalCase to PascalCase', () => {
    expect(toPascalCase('HelloWorld')).toBe('HelloWorld');
  });

  it('should handle single word', () => {
    expect(toPascalCase('hello')).toBe('Hello');
  });

  it('should handle empty string', () => {
    expect(toPascalCase('')).toBe('');
  });

  it('should handle strings with multiple delimiters', () => {
    expect(toPascalCase('hello-world_test')).toBe('HelloWorldTest');
  });

  it('should handle strings with spaces', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });
});
