// @ts-ignore
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readFirstLine = (fileName: string) =>
  readFileSync(`./src/${fileName}`, 'utf8').split('\n')[0];

describe('client directives', () => {
  it('uses a valid React client directive in Icon.ts', () => {
    expect(readFirstLine('Icon.ts')).toBe("'use client';");
  });

  it('uses a valid React client directive in context.ts', () => {
    expect(readFirstLine('context.ts')).toBe("'use client';");
  });
});
