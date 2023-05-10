import { INode, parseSync, stringify } from 'svgson';
import commander from 'svg-path-commander';

const getChildren = (node: INode) => {
  if (node.children && Array.isArray(node.children) && node.children.length) {
    return node.children.flatMap(getChildren);
  }
  if (['rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line', 'path'].includes(node.name)) {
    const order = {
      rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
      circle: ['cx', 'cy', 'r'],
      ellipse: ['cx', 'cy', 'rx', 'ry'],
      polygon: ['points'],
      polyline: ['points'],
      line: ['x1', 'y1', 'x2', 'y2'],
      path: ['d'],
    }[node.name];

    node.attributes = Object.fromEntries(
      Object.entries(node.attributes)
        .filter(([key]) => order.includes(key))
        .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
    );

    if (node.name === 'path') {
      const pattern = /m([^m]*)/gi;
      if (node.attributes.d.match(pattern)?.length > 1) {
        return new commander(node.attributes.d)
          .toAbsolute()
          .toString()
          .match(pattern)
          .map((val) => ({ name: 'path', attributes: { d: val } }));
      }
    }
    return [node];
  }
  return [];
};

export default (svg: string) => {
  const data = parseSync(svg.includes('<svg') ? svg : `<svg>${svg}</svg>`);
  const children = getChildren(data);

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
${children
  .map((c) => '  ' + stringify(c).replace(/\/>$/, ' />'))
  .sort((a, b) => {
    if (a.includes('<path')) return 1;
    if (b.includes('<path')) return -1;
    return a.localeCompare(b);
  })
  .filter((val, idx, arr) => arr.findIndex((v) => v === val) === idx)
  .join('\n')}
</svg>`;
};
