import { bundledLanguages, type ThemeRegistration } from 'shikiji';
import { getHighlighter } from 'shikiji';

type CodeExampleType = {
  title: string;
  language: string;
  code: string;
}[];

const getIconCodes = (): CodeExampleType => {
  return [
    {
      language: 'js',
      title: 'Vanilla',
      code: `\
import { createIcons, icons } from 'lucide';

createIcons({ icons });

document.body.append('<i data-lucide="$Name"></i>');\
  `,
    },
    {
      language: 'tsx',
      title: 'React',
      code: `import { $PascalCase } from 'lucide-react';

const App = () => {
  return (
    <$PascalCase />
  );
};

export default App;
`,
    },
    {
      language: 'vue',
      title: 'Vue',
      code: `<script setup>
import { $PascalCase } from 'lucide-vue-next';
</script>

<template>
  <$PascalCase />
</template>
`,
    },
    {
      language: 'svelte',
      title: 'Svelte',
      code: `<script>
import { $PascalCase } from 'lucide-svelte';
</script>

<$PascalCase />
`,
    },
    {
      language: 'tsx',
      title: 'Preact',
      code: `import { $PascalCase } from 'lucide-preact';

const App = () => {
  return (
    <$PascalCase />
  );
};

export default App;
`,
    },
    {
      language: 'tsx',
      title: 'Solid',
      code: `import { $PascalCase } from 'lucide-solid';

const App = () => {
  return (
    <$PascalCase />
  );
};

export default App;
`,
    },
    {
      language: 'tsx',
      title: 'Angular',
      code: `// app.module.ts
import { LucideAngularModule, $PascalCase } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ $PascalCase })
  ],
})

// app.component.html
<lucide-icon name="$Name"></lucide-icon>
`,
    },
    {
      language: 'html',
      title: 'Icon Font',
      code: `<style>
@import ('~lucide-static/font/Lucide.css');
</style>

<div class="icon-$Name"></div>
`,
    },
  ];
};

export type ThemeOptions =
  | ThemeRegistration
  | { light: ThemeRegistration; dark: ThemeRegistration };

const highLightCode = async (code: string, lang: string, active?: boolean) => {
  const highlighter = await getHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: Object.keys(bundledLanguages),
  });

  const highlightedCode = highlighter
    .codeToHtml(code, {
      lang,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    })
    .replace('shiki-themes', 'shiki-themes vp-code');

  return `<div class="language-${lang} ${active ? 'active' : ''}">
  <button title="Copy Code" class="copy"></button>
  <span class="lang">${lang}</span>
  ${highlightedCode}
  </div>`;
};

export default async function createCodeExamples() {
  const codes = getIconCodes();

  const codeExamplePromises = codes.map(async ({ title, language, code }, index) => {
    const isFirst = index === 0;

    const codeString = await highLightCode(code, language, isFirst);

    return {
      title,
      language: language,
      code: codeString,
    };
  });

  return Promise.all(codeExamplePromises);
}
