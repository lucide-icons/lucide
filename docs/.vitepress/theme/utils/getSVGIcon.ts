const allowedAttrs = [
  'xmlns',
  'width',
  'height',
  'viewBox',
  'fill',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'class',
];

export default function getSVGIcon(element?: HTMLElement, attrs?: Record<string, string>) {
  const svg = element ?? document.querySelector('#previewer svg');
  if (!svg) return;

  const clonedSvg = svg.cloneNode(true) as SVGElement;

  // Filter out attributes that are not allowed in SVGs
  for (const attr of Array.from(clonedSvg.attributes)) {
    if (!allowedAttrs.includes(attr.name)) {
      clonedSvg.removeAttribute(attr.name);
    }
  }

  for (const [key, value] of Object.entries(attrs ?? {})) {
    clonedSvg.setAttribute(key, value);
  }

  const svgString = new XMLSerializer().serializeToString(clonedSvg);

  return svgString;
}
