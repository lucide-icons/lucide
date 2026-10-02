// Run before the body is painted: the generated HTML cannot know local preferences.
(() => {
  try {
    const root = document.documentElement;
    const size = localStorage.getItem('lucide-icon-size');
    const stroke = localStorage.getItem('lucide-icon-stroke-width');
    const color = localStorage.getItem('lucide-icon-color');
    const absolute = localStorage.getItem('lucide-icon-absolute-stroke-width');
    if ([size, stroke, color, absolute].every((value) => value === null)) return;
    if (size !== null && Number.isFinite(Number(size))) {
      root.style.setProperty('--customize-size', String(Math.min(256, Math.max(16, Number(size)))));
    }
    if (stroke !== null && Number.isFinite(Number(stroke)))
      root.style.setProperty(
        '--customize-strokeWidth',
        String(Math.min(3, Math.max(0.5, Number(stroke)))),
      );
    if (color !== null && CSS.supports('color', color))
      root.style.setProperty('--customize-color', color);
    root.classList.toggle('absolute-stroke-width', absolute === 'true');
  } catch {}
})();
