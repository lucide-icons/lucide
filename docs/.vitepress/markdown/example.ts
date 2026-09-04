import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';

type ContainerArgs = [typeof container, string, { render: RenderRule }];

const parseInfo = (info: string, marker: string) => info.trim().slice(marker.length).trim();

const stripWrappingQuotes = (value: string) => {
  const quote = value[0];

  if ((quote === '"' || quote === "'") && value.at(-1) === quote) {
    return value.slice(1, -1);
  }

  return value;
};

const isRawSvgUrl = (url: string) => {
  const [filePath, query = ''] = url.split('?');
  const params = new URLSearchParams(query);

  return filePath.endsWith('.svg') && params.get('raw') === 'true';
};

const isImageUrl = (value: string) => {
  const [filePath] = value.split('?');

  return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(filePath);
};

const resolveMarkdownPath = (env: Record<string, unknown>) =>
  (env.path as string | undefined) ??
  (env.file as string | undefined) ??
  (env.realPath as string | undefined);

const renderImage = (
  url: string,
  env: Record<string, unknown>,
  escapeAttr: (value: string) => string,
) => {
  if (!isRawSvgUrl(url)) {
    return `<img class="example-guidance__image" src="${escapeAttr(url)}" alt="" loading="lazy">`;
  }

  const [filePath] = url.split('?');
  const markdownPath = resolveMarkdownPath(env);
  const resolvedPath = isAbsolute(filePath)
    ? resolve(process.cwd(), `.${filePath}`)
    : resolve(markdownPath ? dirname(markdownPath) : process.cwd(), filePath);
  const svg = readFileSync(resolvedPath, 'utf8');
  const replacedSvg = svg
    .replaceAll(/(#000(000)?|black)/g, 'currentColor')
    .replaceAll(' stroke="#D8D8D9"', 'style="stroke: currentColor; stroke-opacity: .25;"');

  return `<div class="example-guidance__image example-guidance__image--raw">${replacedSvg}</div>`;
};

const renderPreview = (
  value: string,
  env: Record<string, unknown>,
  escapeHtml: (value: string) => string,
  renderInline: (value: string) => string,
) => {
  if (isImageUrl(value)) {
    return renderImage(value, env, escapeHtml);
  }

  return `<div class="example-guidance__text">${renderInline(value)}</div>`;
};

const hasTopLevelContent = (tokens: Parameters<RenderRule>[0], index: number) => {
  let guidanceDepth = 0;

  for (let i = index + 1; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token.type === 'container_example_close') {
      return false;
    }

    if (token.type === 'container_do_open' || token.type === 'container_dont_open') {
      guidanceDepth += 1;
      continue;
    }

    if (token.type === 'container_do_close' || token.type === 'container_dont_close') {
      guidanceDepth -= 1;
      continue;
    }

    if (guidanceDepth === 0) {
      return true;
    }
  }

  return false;
};

const hasGuidance = (tokens: Parameters<RenderRule>[0], index: number) => {
  for (let i = index + 1; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token.type === 'container_example_close') {
      return false;
    }

    if (token.type === 'container_do_open' || token.type === 'container_dont_open') {
      return true;
    }
  }

  return false;
};

const isFirstGuidance = (tokens: Parameters<RenderRule>[0], index: number) => {
  for (let i = index - 1; i >= 0; i -= 1) {
    const token = tokens[i];

    if (token.type === 'container_example_open') {
      return true;
    }

    if (token.type === 'container_do_open' || token.type === 'container_dont_open') {
      return false;
    }
  }

  return true;
};

const getExampleOpenIndex = (tokens: Parameters<RenderRule>[0], index: number) => {
  for (let i = index; i >= 0; i -= 1) {
    if (tokens[i].type === 'container_example_open') {
      return i;
    }
  }

  return index;
};

export default function examplePlugin(md: MarkdownIt) {
  const escapeHtml = md.utils.escapeHtml;

  const createExampleContainer = (): ContainerArgs => [
    container,
    'example',
    {
      render(tokens, idx) {
        const token = tokens[idx];

        if (token.nesting === 1) {
          const hasContent = hasTopLevelContent(tokens, idx);
          const guidanceOnlyClass = hasContent ? '' : ' example-block--guidance-only';
          const contentOpen = hasContent ? '<div class="example-block__content">\n' : '';

          return `<section class="example-block${guidanceOnlyClass}">\n${contentOpen}`;
        }

        const exampleOpenIndex = getExampleOpenIndex(tokens, idx);
        const contentClose =
          hasTopLevelContent(tokens, exampleOpenIndex) && !hasGuidance(tokens, exampleOpenIndex)
            ? '</div>\n'
            : '';

        return `${contentClose}</section>\n`;
      },
    },
  ];

  const createGuidanceContainer = (type: 'do' | 'dont'): ContainerArgs => [
    container,
    type,
    {
      render(tokens, idx, _options, env) {
        const token = tokens[idx];

        if (token.nesting === 1) {
          const exampleOpenIndex = getExampleOpenIndex(tokens, idx);
          const preview = stripWrappingQuotes(parseInfo(token.info, type));
          const media = renderPreview(preview, env, escapeHtml, md.renderInline.bind(md));
          const contentClose =
            hasTopLevelContent(tokens, exampleOpenIndex) && isFirstGuidance(tokens, idx)
              ? '</div>\n'
              : '';
          const label =
            type === 'do'
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Do`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Don't`;

          return `${contentClose}<figure class="example-guidance example-guidance--${type}">${media}<figcaption class="example-guidance__caption"><div class="example-guidance__label">${label}</div>\n`;
        }

        return '</figcaption></figure>\n';
      },
    },
  ];

  md.use(...createExampleContainer());
  md.use(...createGuidanceContainer('do'));
  md.use(...createGuidanceContainer('dont'));
}
