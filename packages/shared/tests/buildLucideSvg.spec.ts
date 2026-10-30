import { describe, it, expect } from 'vitest';
import buildLucideSvg from '../src/build/buildLucideSvg';

const icon = { name: 'dot', size: 24, node: [['circle', { cx: 12, cy: 12, r: 1 }]] } as const;

describe('buildLucideSvg', () => {
  it('should escape special characters in attribute values', () => {
    const svg = buildLucideSvg(icon as any, {
      attributes: { 'data-label': 'a\'s "quoted" <b> & c' },
    });

    expect(svg).toContain('data-label="a&#39;s &quot;quoted&quot; &lt;b&gt; &amp; c"');
  });
});
