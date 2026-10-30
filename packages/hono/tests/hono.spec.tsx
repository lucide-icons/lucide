import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { css, Style } from 'hono/css';
import type { FC } from 'hono/jsx';
import { House, LucideProvider } from '../src/lucide-hono';

describe('Using lucide icons in a Hono app', () => {
  it('should render an icon with c.html()', async () => {
    const app = new Hono();

    app.get('/', (c) =>
      c.html(
        <div>
          <House size={32} />
        </div>,
      ),
    );

    const res = await app.request('/');
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    expect(html).toContain('<svg');
    expect(html).toContain('class="lucide lucide-house lucide-home"');
    expect(html).toContain('width="32"');
  });

  it('should apply LucideProvider values through async components', async () => {
    const AsyncSection: FC = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1));

      return <House />;
    };

    const app = new Hono();

    app.get('/', (c) =>
      c.html(
        <LucideProvider
          size={48}
          color="red"
        >
          <AsyncSection />
        </LucideProvider>,
      ),
    );

    const html = await (await app.request('/')).text();

    expect(html).toContain('width="48"');
    expect(html).toContain('stroke="red"');
  });

  it('should escape attribute values', () => {
    const html = String(<House class={'"><script>alert(1)</script>'} />);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&quot;&gt;&lt;script&gt;');
  });

  it('should support class names from hono/css', async () => {
    const iconClass = css`
      width: 64px;
    `;

    const app = new Hono();

    app.get('/', (c) =>
      c.html(
        <html>
          <head>
            <Style />
          </head>
          <body>
            <House class={iconClass} />
          </body>
        </html>,
      ),
    );

    const html = await (await app.request('/')).text();
    const svgClass = html.match(/<svg[^>]* class="([^"]*)"/)?.[1] ?? '';
    const cssClass = svgClass.split(' ').find((name) => name.startsWith('css-'));

    expect(svgClass).toContain('lucide lucide-house lucide-home');
    expect(cssClass).toBeDefined();
    expect(html).toContain(`.${cssClass}{width:64px}`);
  });

  it('should merge string and hono/css class names', async () => {
    const iconClass = css`
      color: red;
    `;

    const app = new Hono();

    app.get('/', (c) =>
      c.html(
        <div>
          <Style />
          <House
            class="my-icon"
            className={iconClass}
          />
        </div>,
      ),
    );

    const html = await (await app.request('/')).text();
    const svgClass = html.match(/<svg[^>]* class="([^"]*)"/)?.[1] ?? '';

    expect(svgClass).toContain('lucide lucide-house lucide-home');
    expect(svgClass).toContain('my-icon');
    expect(svgClass).toMatch(/css-\d+/);
    expect(html).toContain('{color:red}');
  });
});
