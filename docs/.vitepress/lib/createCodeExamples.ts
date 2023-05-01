import { startCase, camelCase } from "lodash";
import {
  BUNDLED_LANGUAGES,
  type IThemeRegistration
} from 'shiki'
import {
  getHighlighter,
} from 'shiki-processor'

type CodeExampleType = {
  title: string,
  lang: string,
  codes: {
    language?: string,
    code: string,
    metastring?: string,
  }[],
}[]

const getIconCodes = (name: string): CodeExampleType => {
  const pascalCase = startCase(camelCase(name)).replace(/\s/g, '')

  return [
    {
      lang: 'html',
      title: 'HTML',
      codes: [
        {
          language: 'html',
          code: `<i icon-name="${name}"></i>
`,
        },
      ],
    },
    {
      lang: 'tsx',
      title: 'React',
      codes: [
        {
          language: 'tsx',
          code: `import { ${pascalCase} } from 'lucide-react';

const App = () => {
  return (
    <${pascalCase}/>
  );
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
    },
    {
      lang: 'vue',
      title: 'Vue 3',
      codes: [
        {
          language: 'vue',
          code: `<template>
  <${pascalCase} />
</template>

<script setup>
import { ${pascalCase} } from 'lucide-vue-next';
</script>
`,
          metastring: '{2,6}',
        },
      ],
    },
    {
      lang: 'svelte',
      title: 'Svelte',
      codes: [
        {
          language: 'vue',
          code: `<script>
import { ${pascalCase} } from 'lucide-svelte';
</script>

<${pascalCase}/>
`,
          metastring: '{2,5}',
        },
      ],
    },
    {
      lang: 'preact',
      title: 'Preact',
      codes: [
        {
          language: 'tsx',
          code: `import { ${pascalCase} } from 'lucide-preact';

const App = () => {
  return (
    <${pascalCase}/>
  );
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
    },
    {
      lang: 'solid',
      title: 'Solid',
      codes: [
        {
          language: 'tsx',
          code: `import { ${pascalCase} } from 'lucide-solid';

const App = () => {
  return (
    <${pascalCase}/>
  );
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
    },
    {
      lang: 'angular',
      title: 'Angular',
      codes: [
        {
          language: 'tsx',
          code: `// app.module.ts
import { LucideAngularModule, ${pascalCase} } from 'lucide-angular';\r
@NgModule({
  imports: [
    LucideAngularModule.pick({ ${pascalCase} })
  ],
})

// app.component.html
<lucide-icon name="${name}"></lucide-icon>
`,
        },
      ],
    },
    {
      lang: 'html',
      title: 'Icon Font',
      codes: [
        {
          language: 'html',
          code: `<style>
@import ('~lucide-static/font/Lucide.css')
</style>

<div class="icon-${name}"></div>
`,
        },
      ],
    },
    {
      lang: 'dart',
      title: 'Flutter',
      codes: [
        {
          language: 'dart',
          code: `Icon(LucideIcons.${name});
`,
        },
      ],
    },
  ]
}

export type ThemeOptions =
  | IThemeRegistration
  | { light: IThemeRegistration; dark: IThemeRegistration }

const highLightCode = async (code: string, lang: string, active?: boolean) => {
  const highlighter = await getHighlighter({
    themes: ['material-theme-palenight'],
    langs: [...BUNDLED_LANGUAGES],
    processors: []
  })

  const highlightedCode = highlighter.codeToHtml(code, {
    lang,
    // lineOptions,
    theme: 'material-theme-palenight'
  }).replace('background-color: #292D3E', '')

  return `<div class="language-${lang} ${active ? 'active' : ''}">
  <button title="Copy Code" class="copy"></button>
  <span class="lang">${lang}</span>
  ${highlightedCode}
  </div>`
}


export default async function createCodeExamples(name: string) {
  const codes = getIconCodes(name);

  const codeExamplePromises = codes.map(async (codeTemplate, index) => {
    const { title, lang, codes } = codeTemplate;
    const isFirst = index === 0;

    const code = await highLightCode(codes[0].code, codes[0].language || lang, isFirst);

    return {
      title,
      language: codes[0].language || lang,
      code,
    };
  })

  return Promise.all(codeExamplePromises);
}
