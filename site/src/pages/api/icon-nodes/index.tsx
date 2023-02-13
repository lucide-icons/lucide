import {getAllData} from '../../../lib/icons';
import {parseSync} from 'svgson';
import NextCache from "../../../lib/nextCache";

export default async function handler(req, res) {
  const iconNodes = await NextCache.resolve('api-icon-nodes', async () => {
    console.log('building iconNodes');
    return (await getAllData()).reduce((acc, icon, i) => {
      acc[icon.name] = parseSync(icon.src).children.map(({name, attributes}) => [name, attributes]);
      return acc;
    }, {});
  });
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400'
  ).status(200).json(iconNodes);
}
