// Run before the body is painted: the generated HTML cannot know local preferences.
export const iconStyleHeadScript = `(() => {
  try {
    const root = document.documentElement;
    const size = localStorage.getItem('lucide-icon-size');
    const stroke = localStorage.getItem('lucide-icon-stroke-width');
    const color = localStorage.getItem('lucide-icon-color');
    const absolute = localStorage.getItem('lucide-icon-absolute-stroke-width');
    if ([size, stroke, color, absolute].every(value => value === null)) return;
    if (size !== null && Number.isFinite(Number(size))) {
      root.style.setProperty('--customize-size', String(Math.min(256, Math.max(16, Number(size)))));
      root.style.setProperty('--home-customize-size', String(Math.min(48, Math.max(16, Number(size)))));
    }
    if (stroke !== null && Number.isFinite(Number(stroke)))
      root.style.setProperty('--customize-strokeWidth', String(Math.min(3, Math.max(0.5, Number(stroke)))));
    if (color !== null && CSS.supports('color', color)) root.style.setProperty('--customize-color', color);
    root.classList.toggle('absolute-stroke-width', absolute === 'true');
    root.classList.add('icon-style-pending');
  } catch {}
})();`;

export const iconStyleHeadCSS = `
html.icon-style-pending .customizer,
html.icon-style-pending .customizer-card { visibility: hidden; }
html.icon-style-pending .icons-container {
  --customize-size: var(--home-customize-size, 24);
}
html.icon-style-pending.absolute-stroke-width .icons-container .lucide-icon {
  stroke-width: calc(var(--customize-strokeWidth, 2) * 24 / var(--home-customize-size, 24));
}
`;
