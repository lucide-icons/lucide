import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const params = request.query

  return response
    .setHeader(
      'Cache-Control',
      'public, max-age=86400'
    )
    .status(200)
    .json(
      {
        debug: 'Debugging API path'
      }
    );
}
