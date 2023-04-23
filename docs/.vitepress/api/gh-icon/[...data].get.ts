import { eventHandler, getQuery, setResponseHeader, defaultContentType } from 'h3'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import SvgPreview from '../../lib/SvgPreview/index.tsx';

export default eventHandler((event) => {
  const { params } = event.context

  const [name, svgData] = params.data.split('/');
  const data = svgData.slice(0, -4);

  const src = Buffer.from(data, 'base64').toString('utf8');

  const svg = Buffer.from(
    renderToString(createElement(SvgPreview, {src, showGrid: true}))
  ).toString('utf8');

  defaultContentType(event, 'image/svg+xml')
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000')

  return svg
})
