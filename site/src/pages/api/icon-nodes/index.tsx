import {fetchIconNodes} from '../../../lib/fetchIconNodes';

export default async function handler(req, res) {
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400'
  ).status(200).json(await fetchIconNodes(false));
}
