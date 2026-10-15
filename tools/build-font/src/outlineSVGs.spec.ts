import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { outlineSVG } from './outlineSVGs.ts';
import { promises as fs } from 'fs';
import SVGFixer from 'oslllo-svg-fixer';
import path from 'path';

vi.mock('fs', () => ({
  promises: {
    mkdir: vi.fn(),
    copyFile: vi.fn(),
  },
}));

vi.mock('oslllo-svg-fixer', () => ({
  default: vi.fn(),
}));

describe('outlineSVG', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(console, 'time').mockImplementation(() => {});
    vi.spyOn(console, 'timeEnd').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(fs.copyFile).mockResolvedValue(undefined);
    vi.mocked(SVGFixer).mockReturnValue({
      fix: vi.fn().mockResolvedValue(undefined),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates outlined files and duplicates aliases', async () => {
    await outlineSVG({
      iconsDir: '/icons',
      outlinedDir: '/outlined',
      iconsWithAliases: [
        ['camera', ['snapshot', 'shutter']],
        ['heart', []],
      ],
    });

    expect(fs.mkdir).toHaveBeenCalledWith('/outlined');
    expect(SVGFixer).toHaveBeenCalledWith('/icons', '/outlined', {
      showProgressBar: true,
      traceResolution: 800,
    });
    expect(fs.copyFile).toHaveBeenCalledWith(
      path.join('/outlined', 'camera.svg'),
      path.join('/outlined', 'snapshot.svg'),
    );
    expect(fs.copyFile).toHaveBeenCalledWith(
      path.join('/outlined', 'camera.svg'),
      path.join('/outlined', 'shutter.svg'),
    );
    expect(console.log).toHaveBeenCalledWith('Copied camera.svg to snapshot.svg');
    expect(console.timeEnd).toHaveBeenCalledWith('icon outliner');
  });

  it('logs copy failures per alias without aborting', async () => {
    const copyError = new Error('copy failed');
    vi.mocked(fs.copyFile).mockImplementation((_, destinationPath) => {
      if (destinationPath === path.join('/outlined', 'snapshot.svg')) {
        return Promise.reject(copyError);
      }

      return Promise.resolve();
    });

    await outlineSVG({
      iconsDir: '/icons',
      outlinedDir: '/outlined',
      iconsWithAliases: [['camera', ['snapshot', 'shutter']]],
    });

    expect(console.log).toHaveBeenCalledWith(
      `Failed to copy ${path.join('/outlined', 'camera.svg')} to ${path.join('/outlined', 'snapshot.svg')}:`,
      copyError,
    );
    expect(fs.copyFile).toHaveBeenCalledTimes(2);
  });

  it('catches and logs top-level errors', async () => {
    const fixError = new Error('fix failed');
    vi.mocked(SVGFixer).mockReturnValue({
      fix: vi.fn().mockRejectedValue(fixError),
    });

    await outlineSVG({
      iconsDir: '/icons',
      outlinedDir: '/outlined',
      iconsWithAliases: [['camera', []]],
    });

    expect(console.log).toHaveBeenCalledWith(fixError);
  });
});
