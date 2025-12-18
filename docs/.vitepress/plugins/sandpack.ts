
import type MarkdownIt from 'markdown-it';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import container from 'markdown-it-container'
import sandpackTheme from '../theme/sandpackTheme.json'

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

const useSnippets = (input = '') => {
  const strings = input.split(' ');
  let usedSnippets = false;
  for (const str of strings) {
    if (/([{1})([\s\S]*)([\.]{1}([\s\S]+))(]{1})/.test(str)) {
      usedSnippets = true;
      break;
    }
  }
  return usedSnippets;
};



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


      console.log(attrs);


      for (
        let i = idx + 1;
        !(
              tokens[i].nesting === -1 &&
              tokens[i].type === 'container_sandpack_close'
            );
        ++i
      ) {
        if (tokens[i].type === 'fence' && tokens[i].tag === 'code') {
          let lang = '';
          let tokenVal = (tokens[i]?.info as string) || '';

          console.log(tokenVal);


          if (useSnippets(tokenVal)) {
            if (!tokenVal.includes('prefix=')) {
              tokenVal = tokenVal.replace('[', ' /').replace(']', '');
            } else {
              tokenVal = tokenVal.replace('prefix=', '').replace('[', '').replace(']', '');
            }

            console.log(tokens[i]);


            lang = tokenVal.substring(tokenVal.lastIndexOf('.') + 1);

            console.log(lang);

            tokenVal = `${lang} ${tokenVal}`;
          }
          fileAttr.push(tokenVal);
        }
      }

      // console.log(attrs);

      // const attrs = tokens[idx].attrs?.map(([key, val]) => (val ? `${key}="${val}"` : key)) || [];
      return `<Sandpack :theme="${escapeHtml(JSON.stringify(sandpackTheme)}" ${fileAttr>`;
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
