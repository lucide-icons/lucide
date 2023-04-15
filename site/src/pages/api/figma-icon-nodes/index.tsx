import { NextApiRequest, NextApiResponse } from 'next';
import {fetchIconNodes} from '../../../lib/fetchIconNodes';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const params = request.query

  return response
    .setHeader(
      'Cache-Control',
      'public, max-age=86400'
    )
    .status(200)
    .json(
      await fetchIconNodes(false, params)
    );
}
