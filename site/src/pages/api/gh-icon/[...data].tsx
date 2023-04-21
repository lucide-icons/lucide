import { getData } from 'src/lib/icons';
import SvgPreview from '../../../components/SvgPreview';
import { stringify } from 'svgson';
import { ReactNode } from 'react';

export default async function handler(req, res) {
  // ReactDOMServer needs to be imported dynamically
  // https://github.com/vercel/next.js/issues/43810
  const ReactDOMServer = (await import('react-dom/server')).default;

  const url = req.url.split('/');
  const data = url.at(-1).slice(0, -4);
  const src = Buffer.from(data, 'base64')
    .toString('utf8')
    .replace(/<svg[^>]*>|<\/svg>/g, '');

  let backdrop: ReactNode;
  try {
    if (url.at(-2) !== 'gh-icon') {
      const backdropString = stringify({
        type: 'element',
        name: 'svg',
        value: undefined,
        attributes: {},
        children: (await getData(url.at(-2))).iconNode.map(([name, attributes]) => ({
          type: 'element',
          name,
          attributes,
          children: undefined,
          value: undefined,
        })),
      }).replace(/<svg[^>]*>|<\/svg>/g, '');

      backdrop = (
        <>
          <defs xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="pattern"
              width=".1"
              height=".1"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45 50 50)"
            >
              <line stroke="red" strokeWidth={0.1} y2={1} />
              <line stroke="red" strokeWidth={0.1} y2={1} />
            </pattern>
          </defs>
          <mask id="svg-preview-backdrop-mask-outline" maskUnits="userSpaceOnUse">
            <g stroke="#fff" dangerouslySetInnerHTML={{ __html: backdropString }} />
            <g dangerouslySetInnerHTML={{ __html: src }} strokeWidth={2.05} />
          </mask>
          <mask id="svg-preview-backdrop-mask-fill" maskUnits="userSpaceOnUse">
            <g stroke="#fff" dangerouslySetInnerHTML={{ __html: backdropString }} />
            <g dangerouslySetInnerHTML={{ __html: src }} strokeWidth={2.05} />
            <g strokeWidth={1.75} dangerouslySetInnerHTML={{ __html: backdropString }} />
          </mask>
          <g
            strokeWidth={2.25}
            stroke="url(#pattern)"
            mask={'url(#svg-preview-backdrop-mask-outline)'}
          >
            <rect
              x="0"
              y="0"
              width="24"
              height="24"
              fill="url(#pattern)"
              opacity={0.5}
              stroke="none"
            />
          </g>
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            fill="url(#pattern)"
            stroke="none"
            mask={'url(#svg-preview-backdrop-mask-fill)'}
          />
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            fill="red"
            opacity={0.5}
            stroke="none"
            mask={'url(#svg-preview-backdrop-mask-fill)'}
          />
        </>
      );
    }
  } catch (e) {
    backdrop = undefined;
  }

  const svg = Buffer.from(
    ReactDOMServer.renderToString(
      <SvgPreview src={src} showGrid>
        {backdrop}
      </SvgPreview>
    )
  );

  res.setHeader('Cache-Control', 'public,max-age=31536000');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).end(svg);
}
