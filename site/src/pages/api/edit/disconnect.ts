import { parseSync, stringify } from 'svgson';
import { format } from './format';
import { getPaths } from '../../../components/SvgPreview/utils';

const disconnect = (svg: string) => {
  const data = parseSync(svg);
  const paths = getPaths(svg);
  const beforeLength = data.children.length;
  data.children = data.children.flatMap((node, idx) => {
    if (node.name !== 'path') return [node];
    const segments = paths.filter(({ c }) => c.id === idx);
    return segments.map(({ d }) => ({
      ...node,
      attributes: {
        d: d.replace(/\d*\.\d+/g, (val) => Math.round(parseFloat(val) * 100) / 100 + ''),
      },
    }));
  });
  if (beforeLength === data.children.length) return svg;
  return stringify(data);
};

export default async function handler(req, res) {
  const before = format(req.body);
  const after = format(disconnect(before));
  res.status(200).end(before === after ? req.body : after);
}
