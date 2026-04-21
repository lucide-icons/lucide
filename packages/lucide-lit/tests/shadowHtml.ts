export function normalizeShadowHtml(html: string | undefined): string {
  if (!html) return '';
  return html
    .replace(/<!--\?lit[^>]*-->/g, '')
    .replace(/<!---->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
