import type { Child } from 'hono/jsx';

/**
 * Renders a Hono JSX node to an HTML string, then mounts that string in a DOM container
 * so the same DOM assertions as the other Lucide packages can be used.
 */
export const render = (node: Child) => {
  const html = String(node);
  const container = document.createElement('div');

  container.innerHTML = html;
  document.body.appendChild(container);

  return { container, html };
};

export const cleanup = () => {
  document.body.innerHTML = '';
};
