import { parseHTML } from 'linkedom';
import { getQueriesForElement } from '@testing-library/dom';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { type AstroComponentFactory, HTMLString } from 'astro/runtime/server/index.js';
import type { RenderFn } from './types';

export const render = async function (AstroComponent, options?) {
  const astroContainer = await AstroContainer.create();
  const htmlString = await astroContainer.renderToString(
    AstroComponent as AstroComponentFactory,
    options,
  );

  const { document } = parseHTML(injectMissingParentTags(htmlString));
  const container = document.body;

  return { container, html: htmlString, ...getQueriesForElement(container) };
} satisfies RenderFn;

// html strings need to be marked with this class
// otherwise, Astro is gonna escape the html entities
export function createAstroHTMLString(htmlString: string) {
  return new HTMLString(htmlString);
}

// needed so linkedom generates the tree correctly
function injectMissingParentTags(markup: string) {
  return `<html><body>${markup}</body></html>`;
}
