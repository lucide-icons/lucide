import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';
import sandpackTheme from '../theme/sandpackTheme.json';
import defaultStyle from '../theme/sandpack-default.css?raw';

type SnackParams = {
  defaultFiles?: Record<
    string,
    {
      code: string;
      active?: boolean;
      hidden?: boolean;
    }
  >;
};

type ContainerArgs = [typeof container, string, { render: RenderRule }];

export default function sandpackPlugin(md: MarkdownIt, pluginOptions: SnackParams = {}) {
  const escapeHtml = md.utils.escapeHtml;
  const defaultFence =
    md.renderer.rules.fence ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  const renderSandbox = (tokenList: any[], index: number) => {
    const renderFunc = (tokens: any[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        const fileAttr: string[] = [];
        const attrs = Object.fromEntries(tokens[idx].attrs || []);

        const files: Record<
          string,
          {
            code: string;
            active?: boolean;
            hidden?: boolean;
          }
        > = {};

        for (
          let i = idx + 1;
          !(tokens[i].nesting === -1 && tokens[i].type === 'container_sandpack_close');
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

        const { dependencies, showTabs, externalResources, editorWidthPercentage ,...options } = attrs;

        const dependencyList = dependencies?.split(',')?.map((dep: string) => dep.trim()) ?? [];

        const dependencyObject = dependencyList.reduce(
          (acc: Record<string, string>, cur: string) => {
            const [name, version] = cur.split('@').map((str) => str.trim());
            acc[name] = version || 'latest';
            return acc;
          },
          {},
        );

        const externalResourcesList = externalResources?.split(',')?.map((res: string) => res.trim())?.filter((res: string) => res.length > 0);

        const filesWithDefaultStyles = {
          ...pluginOptions.defaultFiles,
          ...files,
        }

        return `\
        <Sandpack\
          template="${escapeHtml(attrs.template || 'vanilla')}"\
          :theme="${escapeHtml(JSON.stringify(sandpackTheme))}"\
          :customSetup="${escapeHtml(
            dependencyList ? JSON.stringify({
              dependencies: dependencyList.length ? dependencyObject : {},
            }) : undefined,
          )}"
          :files="${escapeHtml(JSON.stringify(filesWithDefaultStyles))}"\
          :options="${escapeHtml(JSON.stringify({
            ...(showTabs ? { showTabs: JSON.parse(showTabs) } : {}),
            externalResources:externalResourcesList,
            editorWidthPercentage: editorWidthPercentage ? Number(editorWidthPercentage) : undefined,
            ...options,
          }))}"\
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
        },
      },
    ];
  }

  md.use(...createCodeGroup(md));
}
