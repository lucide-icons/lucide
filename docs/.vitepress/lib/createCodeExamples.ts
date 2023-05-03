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

const getIconCodes = (): CodeExampleType => {
  return [
    {
      lang: 'html',
      title: 'HTML',
      codes: [
        {
          language: 'html',
          code: `<i data-lucide-name="Name"></i>
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
          code: `import { PascalCase } from 'lucide-react';

const App = () => {
  return (
    <PascalCase strokeWidth={2} size={32} color="#000"/>
  );
};

export default App;
`,

        },
      ],
    },
    {
      lang: 'vue',
      title: 'Vue 3',
      codes: [
        {
          language: 'vue',
          code: `<script setup>
  import { PascalCase } from 'lucide-vue-next';
</script>

<template>
  <PascalCase />
</template>
`,

        },
      ],
    },
    {
      lang: 'svelte',
      title: 'Svelte',
      codes: [
        {
          language: 'svelte',
          code: `<script>
import { PascalCase } from 'lucide-svelte';
</script>

<PascalCase />
`,

        },
      ],
    },
    {
      lang: 'preact',
      title: 'Preact',
      codes: [
        {
          language: 'tsx',
          code: `import { PascalCase } from 'lucide-preact';

const App = () => {
  return (
    <PascalCase />
  );
};

export default App;
`,

        },
      ],
    },
    {
      lang: 'solid',
      title: 'Solid',
      codes: [
        {
          language: 'tsx',
          code: `import { PascalCase } from 'lucide-solid';

const App = () => {
  return (
    <PascalCase />
  );
};

export default App;
`,

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
import { LucideAngularModule, PascalCase } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ PascalCase })
  ],
})

// app.component.html
<lucide-icon name="Name"></lucide-icon>
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
@import ('~lucide-static/font/Lucide.css');
</style>

<div class="icon-Name"></div>
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
          code: `Icon(LucideIcons.Name);
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


export default async function createCodeExamples() {
  const codes = getIconCodes();

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
