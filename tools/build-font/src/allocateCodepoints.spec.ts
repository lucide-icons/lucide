import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { put } from '@vercel/blob';
import { allocateCodePoints } from './allocateCodepoints.ts';

vi.mock('@vercel/blob', () => ({
  put: vi.fn(),
}));

function mockLatestCodePoints(codePoints: Record<string, number>) {
  const response = {
    json: vi.fn().mockResolvedValue(structuredClone(codePoints)),
  };

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));
}

describe('allocateCodePoints', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps existing code points and allocates new ones in sequence', async () => {
    mockLatestCodePoints({ camera: 57400 });

    const codePoints = await allocateCodePoints({
      iconsWithAliases: [
        ['camera', ['camera-old']],
        ['new-icon', []],
      ],
    });

    expect(codePoints.camera).toBe(57400);
    expect(codePoints['camera-old']).toBe(57400);
    expect(codePoints['new-icon']).toBe(57401);
    expect(fetch).toHaveBeenCalledWith(
      'https://geoxmjocxfnaryc4.public.blob.vercel-storage.com/latest/font/codepoints.json',
    );
  });

  it('preserves legacy alias code points when alias and canonical differ', async () => {
    mockLatestCodePoints({ camera: 57400, shutter: 57405 });

    const codePoints = await allocateCodePoints({
      iconsWithAliases: [['camera', ['shutter']]],
    });

    expect(codePoints.camera).toBe(57400);
    expect(codePoints.shutter).toBe(57405);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('adding a legacy alias codepoint'),
    );
  });

  it('throws when a legacy alias code point is already allocated and fixes are disabled', async () => {
    mockLatestCodePoints({ 'icon-b': 57402, 'icon-a': 57400, 'alias-a': 57402 });

    await expect(
      allocateCodePoints({
        iconsWithAliases: [
          ['icon-b', []],
          ['icon-a', ['alias-a']],
        ],
      }),
    ).rejects.toThrow(
      "The code point for alias 'alias-a' for 'icon-a' is already allocated to: 'icon-b'.",
    );
  });

  it('throws when two canonical icons share the same code point without allowFixes', async () => {
    mockLatestCodePoints({ 'icon-a': 57400, 'icon-b': 57400 });

    await expect(
      allocateCodePoints({
        iconsWithAliases: [
          ['icon-a', []],
          ['icon-b', []],
        ],
      }),
    ).rejects.toThrow(
      "We couldn't assign a unique codepoint for 'icon-b', since '57400' was already taken up by 'icon-a'",
    );
  });

  it('skips conflicting legacy alias code points when fixes are enabled', async () => {
    mockLatestCodePoints({ 'icon-b': 57402, 'icon-a': 57400, 'alias-a': 57402 });

    const codePoints = await allocateCodePoints({
      allowFixes: true,
      iconsWithAliases: [
        ['icon-b', []],
        ['icon-a', ['alias-a']],
      ],
    });

    expect(codePoints['icon-a']).toBe(57400);
    expect(codePoints['alias-a']).toBe(57400);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("we're simply not adding this custom alias codepoint"),
    );
  });

  it('reassigns duplicate canonical code points when fixes are enabled', async () => {
    mockLatestCodePoints({ 'icon-a': 57400, 'icon-b': 57400 });

    const codePoints = await allocateCodePoints({
      allowFixes: true,
      iconsWithAliases: [
        ['icon-a', []],
        ['icon-b', []],
      ],
    });

    expect(codePoints['icon-a']).toBe(57400);
    expect(codePoints['icon-b']).toBe(57401);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Assigning a new codepoint for 'icon-b'"),
    );
  });

  it('uploads the merged code point map when saveCodePoints is enabled', async () => {
    mockLatestCodePoints({ camera: 57400 });

    await allocateCodePoints({
      saveCodePoints: true,
      iconsWithAliases: [['camera', ['camera-old']]],
    });

    expect(put).toHaveBeenCalledWith(
      'latest/font/codepoints.json',
      JSON.stringify({ camera: 57400, 'camera-old': 57400 }, null, 2),
      { access: 'public', allowOverwrite: true },
    );
    expect(console.log).toHaveBeenCalledWith('Code points uploaded to Vercel Blob Storage.');
  });
});
