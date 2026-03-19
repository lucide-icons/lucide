import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
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

function registerCustomAngularTemplates(
  filesWithDefaultStyles: NonNullable<SnackParams['defaultFiles']>,
) {
  Object.assign(filesWithDefaultStyles, {
    '/src/polyfills.ts': {
      code: '',
    },
    '/src/main.ts': {
      code: `import "@angular/compiler";
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';

void bootstrapApplication(App, {})
  .catch((err) => console.error(err));`,
    },
    '/package.json': {
      code: JSON.stringify({
        dependencies: {
          '@angular/common': '^21.0.0',
          '@angular/compiler': '^21.0.0',
          '@angular/core': '^21.0.0',
          '@angular/forms': '^21.0.0',
          '@angular/platform-browser': '^21.0.0',
          '@angular/router': '^21.0.0',
          'zone.js': '0.16.1',
          'core-js': '3.48.0',
          rxjs: '7.4.0',
        },
        main: '/src/main.ts',
        devDependencies: {
          '@angular/build': '^21.0.3',
          '@angular/cli': '^21.0.3',
          '@angular/compiler-cli': '^21.0.0',
        },
      }),
    },
  });
}

export default function sandpackPlugin(md: MarkdownIt, pluginOptions: SnackParams = {}) {
  if (md == null) {
    throw new Error('MarkdownIt instance is required for sandpackPlugin');
  }
  const escapeHtml = md?.utils?.escapeHtml;
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

        if (attrs.template === 'angular') {
          registerCustomAngularTemplates(filesWithDefaultStyles);
        }

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
