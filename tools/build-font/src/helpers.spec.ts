import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hasMissingCodePoints } from './helpers.ts';

describe('hasMissingCodePoints', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when all canonical names and aliases are present', () => {
    const hasMissing = hasMissingCodePoints(
      [
        ['camera', ['snapshot']],
        ['heart', []],
      ],
      {
        camera: 57400,
        snapshot: 57400,
        heart: 57401,
      },
    );

    expect(hasMissing).toBe(false);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('returns true and logs the first missing icon or alias', () => {
    const hasMissing = hasMissingCodePoints(
      [
        ['camera', ['snapshot']],
        ['heart', []],
      ],
      {
        camera: 57400,
        heart: 57401,
      },
    );

    expect(hasMissing).toBe(true);
    expect(console.log).toHaveBeenCalledWith('Missing code point for icon/alias: snapshot');
  });
});
