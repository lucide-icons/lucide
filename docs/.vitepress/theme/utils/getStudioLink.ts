import type { IconNode } from '../types';

function getInnerSvg(iconNode: IconNode) {
  return iconNode
    .map(([tag, attrs]) => {
      const attributes = Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${tag} ${attributes}/>`;
    })
    .join('')
    .replace(/>[\r\n ]+</g, '><')
    .replace(/(<.*?>)|\s+/g, (m, $1) => $1 || ' ')
    .trim();
}

export default function getStudioLink(
  name: string,
  iconNode: IconNode,
  utmMedium = 'icon-detail-preview',
) {
  const base64InnerSvg = btoa(getInnerSvg(iconNode ?? []));

  return `https://studio.lucide.dev/edit?value=${encodeURIComponent(base64InnerSvg)}&name=${name}&utm_source=lucide.dev&utm_medium=${utmMedium}`;
}
