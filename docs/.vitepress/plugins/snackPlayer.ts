/**
 * SnackPlayer markdown-it plugin
 *
 * Converts fenced code blocks like:
 *
 * ```SnackPlayer name=My%20Example&description=Nice%20demo&ext=tsx
 * // code here
 * ```
 *
 * into:
 *
 * <div
 *   class="snack-player"
 *   data-snack-name="My Example"
 *   ...
 * />
 */

import type MarkdownIt from 'markdown-it';

type SnackParams = Record<string, string>;

function parseParams(paramString = ''): SnackParams {
  const params = Object.fromEntries(
    new URLSearchParams(paramString),
  ) as SnackParams;

  if (!params.platform) {
    params.platform = 'web';
  }

  return params;
}

export default function snackPlayerPlugin(md: MarkdownIt) {
  const escapeHtml = md.utils.escapeHtml;
  const defaultFence =
    md.renderer.rules.fence ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options));

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = (token.info || '').trim();

    if (!info) {
      return defaultFence(tokens, idx, options, env, self);
    }

    const [lang, ...rest] = info.split(/\s+/);
    if (lang !== 'SnackPlayer') {
      return defaultFence(tokens, idx, options, env, self);
    }

    const paramString = rest.join(' ');
    const params = parseParams(paramString);

    // Gather necessary params
    const name = params.name
      ? decodeURIComponent(params.name)
      : 'Example';
    const description = params.description
      ? decodeURIComponent(params.description)
      : 'Example usage';
    const ext = params.ext ? decodeURIComponent(params.ext) : 'tsx';
    const filename = `App.${ext}`;

    const files = encodeURIComponent(
      JSON.stringify({
        [filename]: {
          type: 'CODE',
          contents: token.content,
        },
      }),
    );

    const dependencies =
      'react-native-safe-area-context' +
      (params.dependencies ? `,${params.dependencies}` : '');
    const platform = params.platform ?? 'web';
    const supportedPlatforms =
      params.supportedPlatforms ?? 'ios,android,web';
    const theme = params.theme ?? 'light';
    const preview = params.preview ?? 'true';
    const loading = params.loading ?? 'lazy';
    const deviceAppearance = params.deviceAppearance ?? 'dark';

    // Build the HTML output (escaping where appropriate)
    return (
      `<SnackPlayer` +
      ` class="snack-player"` +
      ` data-snack-name="${escapeHtml(name)}"` +
      ` data-snack-description="${escapeHtml(description)}"` +
      ` data-snack-files="${files}"` +
      ` data-snack-dependencies="${escapeHtml(dependencies)}"` +
      ` data-snack-platform="${escapeHtml(platform)}"` +
      ` data-snack-supported-platforms="${escapeHtml(
        supportedPlatforms,
      )}"` +
      // ` data-snack-theme="${escapeHtml(theme)}"` +
      ` data-snack-preview="${escapeHtml(preview)}"` +
      ` data-snack-loading="${escapeHtml(loading)}"` +
      ` data-snack-device-appearance="${escapeHtml(
        deviceAppearance,
      )}"` +
      ` data-snack-device-frame="false"` +
      `></SnackPlayer>`
    );
  };
}
