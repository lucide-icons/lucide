import {getAllData} from '../../../lib/icons';
import NextCache from "../../../lib/nextCache";

export default async function handler(req, res) {
  const tags = await NextCache.resolve('api-tags', async () => {
    console.log('building tags');
    return (await getAllData()).reduce((acc, icon, i) => {
      acc[icon.name] = icon.tags;
      return acc;
    }, {});
  });
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400'
  ).status(200).json(tags);
}
