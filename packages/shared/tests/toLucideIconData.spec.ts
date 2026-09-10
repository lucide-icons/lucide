import { describe, it, expect } from 'vitest';
import { toLucideIconData } from '../src/utils/toLucideIconData';

describe('toLucideIconData', () => {
  it('converts legacy name and node to icon data object', () => {
    const iconNode = [['path', { d: 'M0 0h1' }]];

    expect(toLucideIconData('AirVent', iconNode)).toEqual({
      name: 'air-vent',
      size: 24,
      node: iconNode,
    });
  });

  it('adds aliases when provided for legacy input', () => {
    const iconNode = [['path', { d: 'M0 0h1' }]];

    expect(toLucideIconData('AirVent', iconNode, ['vent'])).toEqual({
      name: 'air-vent',
      size: 24,
      node: iconNode,
      aliases: ['vent'],
    });
  });

  it('throws when icon node is missing for legacy string input', () => {
    expect(() => toLucideIconData('AirVent', undefined as never)).toThrowError(
      '[lucide]: iconNode is required when icon name is used',
    );
  });
});
