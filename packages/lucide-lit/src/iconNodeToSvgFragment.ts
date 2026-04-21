import type { IconNode } from './types';

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * Serialize trusted IconNode data to an SVG fragment for use with unsafeSVG.
 * Strips React-style `key` attributes (not valid on DOM).
 */
export function iconNodeToSvgFragment(nodes: IconNode): string {
  return nodes
    .map(([tag, attrs]) => {
      const { key: _k, ...rest } = attrs;
      const attrStr = Object.entries(rest)
        .map(([k, v]) => `${k}="${escapeAttr(String(v))}"`)
        .join(' ');
      return attrStr ? `<${tag} ${attrStr} />` : `<${tag} />`;
    })
    .join('');
}
