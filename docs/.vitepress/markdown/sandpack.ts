import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type Token from 'markdown-it/lib/token.mjs';
import container from 'markdown-it-container';
import sandpackTheme from '../theme/sandpackTheme.json';

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
  if (md == null) {
    throw new Error('MarkdownIt instance is required for sandpackPlugin');
  }
  const escapeHtml = md?.utils?.escapeHtml;

  const renderSandbox = (tokenList: Token[], index: number) => {
    const renderFunc = (tokens: Token[], idx: number) => {
      if (tokens[idx].nesting === 1) {
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
            const [, fileName, params = ''] = info.split(' ');

            const active = params.includes('[active]');
            const hidden = params.includes('[hidden]');

            const code = tokens[i].content;

            if (fileName && code) {
              files[fileName] = {
                code,
                ...(active && { active: true }),
                ...(hidden && { hidden: true }),
              };
            }
          }
        }

        const { dependencies, showTabs, externalResources, editorWidthPercentage, ...options } =
          attrs;

        const dependencyList = dependencies?.split(',')?.map((dep: string) => dep.trim()) ?? [];

        const dependencyObject = dependencyList.reduce(
          (acc: Record<string, string>, name: string) => {
            acc[name] = 'latest';
            return acc;
          },
          {},
        );

        const externalResourcesList = externalResources
          ?.split(',')
          ?.map((res: string) => res.trim())
          ?.filter((res: string) => res.length > 0);

        const filesWithDefaultStyles = {
          ...pluginOptions.defaultFiles,
          ...files,
        };

        return `\
        <Sandpack\
          template="${escapeHtml(attrs.template || 'vanilla')}"\
          :theme="${escapeHtml(JSON.stringify(sandpackTheme))}"\
          :customSetup="${escapeHtml(
            dependencyList
              ? JSON.stringify({
                  dependencies: dependencyList.length ? dependencyObject : {},
                })
              : undefined,
          )}"
          :files="${escapeHtml(JSON.stringify(filesWithDefaultStyles))}"\
          :options="${escapeHtml(
            JSON.stringify({
              ...(showTabs ? { showTabs: JSON.parse(showTabs) } : {}),
              externalResources: externalResourcesList,
              editorWidthPercentage: editorWidthPercentage
                ? Number(editorWidthPercentage)
                : undefined,
              ...options,
            }),
          )}"\
        >`;
      }
      return `</Sandpack>`;
    };
    return renderFunc(tokenList, index);
  };

  function createCodeGroup(): ContainerArgs {
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

  md.use(...createCodeGroup());
}
