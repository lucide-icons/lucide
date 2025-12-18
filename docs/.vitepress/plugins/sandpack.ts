
import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import container from 'markdown-it-container'
import sandpackTheme from '../theme/sandpackTheme.json'

type SnackParams = Record<string, string>;

type ContainerArgs = [typeof container, string, { render: RenderRule }]

export default function sandpackPlugin(md: MarkdownIt) {
  const escapeHtml = md.utils.escapeHtml;
  const defaultFence =
    md.renderer.rules.fence ||
    ((tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options));

  const renderSandbox = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    if (tokens[idx].nesting === 1) {
      const fileAttr: string[] = [];
      const attrs = Object.fromEntries(tokens[idx].attrs || []);

      const files: Record<string, {
        code: string;
        active?: boolean;
        hidden?: boolean;
      }> = {};

      for (
        let i = idx + 1;
        !(
          tokens[i].nesting === -1 &&
          tokens[i].type === 'container_sandpack_close'
        );
        ++i
      ) {
        if (tokens[i].type === 'fence' && tokens[i].tag === 'code') {
          const info = tokens[i].info ?? '';
          const [lang, fileName, params = ''] = info.split(' ');

          const active = params.includes('[active]');
          const hidden = params.includes('[hidden]');

          const code = tokens[i].content;

          if (fileName && code) {
              files[fileName] = {
                code,
              };

              if (active) {
                (files[fileName] as any).active = true;
              }

              if (hidden) {
                (files[fileName] as any).hidden = true;
              }
          }
        }
      }

      const { dependencies, ...options } = attrs

      const dependencyList = dependencies.split(',').map((dep: string) => dep.trim());

      const dependencyObject = dependencyList.reduce((acc: Record<string, string>, cur: string) => {
        const [name, version] = cur.split('@').map((str) => str.trim());
        acc[name] = version || 'latest';
        return acc;
      }, {});

      return `\
        <Sandpack\
          template="${escapeHtml(attrs.template || 'vanilla')}"\
          :theme="${escapeHtml(JSON.stringify(sandpackTheme))}"\
          :customSetup="${escapeHtml(
            JSON.stringify({
              dependencies: dependencyList.length
                ? dependencyObject
                : {},
            }),
          )}"
          :files="${escapeHtml(JSON.stringify(files))}"\
          :options="${escapeHtml(JSON.stringify(options))}"\
        >`;
    }
    return `</Sandpack>`;
  };
  return renderFunc(tokenList, index);
};

function createCodeGroup(md: MarkdownIt): ContainerArgs {
  return [
    container,
    'sandpack',
    {
      render(tokens, idx) {
        return renderSandbox(tokens, idx);

      }
    }
  ]
}


  md.use(...createCodeGroup(md))
}
