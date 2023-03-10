import { renderToString } from 'react-dom/server';
import SvgPreview from '../../../components/SvgPreview';

export default async function handler(req, res) {
  const src = Buffer.from(req.query.data.slice(0, -4), 'base64').toString('ascii');

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).end(renderToString(<SvgPreview src={src} showGrid />));
}
