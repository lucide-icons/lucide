import SvgPreview from '../../../components/SvgPreview';

export default async function handler(req, res) {
  // ReactDOMServer needs to be imported dynamically
  // https://github.com/vercel/next.js/issues/43810
  const ReactDOMServer = (await import('react-dom/server')).default;

  const url = req.url.split('/').at(-1);
  const data = url.slice(0, -4);
  const src = Buffer.from(data, 'base64').toString('utf8');

  const svg = Buffer.from(
    ReactDOMServer.renderToString(<SvgPreview src={src} showGrid />)
  );

  res.setHeader('Cache-Control', 'public,max-age=31536000');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).end(svg);
}
