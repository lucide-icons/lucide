import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildFont } from './buildFont.ts';
import svgtofont from 'svgtofont';

vi.mock('svgtofont', () => ({
  default: vi.fn(),
}));

describe('buildFont', () => {
  beforeEach(() => {
    vi.spyOn(console, 'time').mockImplementation(() => {});
    vi.spyOn(console, 'timeEnd').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls svgtofont with expected settings and unicode resolver', async () => {
    vi.mocked(svgtofont).mockResolvedValue(undefined);

    await buildFont({
      inputDir: '/icons',
      targetDir: '/dist',
      fontName: 'lucide',
      classNamePrefix: 'icon',
      codePoints: { camera: 57400 },
      startUnicode: 57400,
    });

    expect(console.time).toHaveBeenCalledWith('Font generation');
    expect(console.timeEnd).toHaveBeenCalledWith('Font generation');
    expect(svgtofont).toHaveBeenCalledTimes(1);

    const [options] = vi.mocked(svgtofont).mock.calls[0];

    expect(options.src).toBe('/icons');
    expect(options.dist).toBe('/dist');
    expect(options.fontName).toBe('lucide');
    expect(options.classNamePrefix).toBe('icon');
    expect(options.addLigatures).toBe(true);
    expect(options.getIconUnicode('camera')).toEqual([String.fromCharCode(57400), 57400]);
    expect(() => options.getIconUnicode('missing')).toThrow('No codepoint found for icon: missing');
  });

  it('logs errors from svgtofont and still finishes timing', async () => {
    const error = new Error('svgtofont failed');
    vi.mocked(svgtofont).mockRejectedValue(error);

    await buildFont({
      inputDir: '/icons',
      targetDir: '/dist',
      fontName: 'lucide',
      classNamePrefix: 'icon',
      codePoints: { camera: 57400 },
      startUnicode: 57400,
    });

    expect(console.log).toHaveBeenCalledWith(error);
    expect(console.timeEnd).toHaveBeenCalledWith('Font generation');
  });
});
