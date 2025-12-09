import { bundledLanguages, type ThemeRegistration } from 'shiki';
import { createHighlighter } from 'shiki';

type CodeExampleType = {
  title: string;
  language: string;
  code: string;
}[];

const getIconCodes = (): CodeExampleType => {
  return [
    {
      language: 'html',
      title: 'Vanilla',
      code: `\
<script>
import { createIcons } from 'lucide';
import { $CamelCase } from '@lucide/lab';

createIcons({
  icons: {
    $CamelCase
  },
});
</script>

<i data-lucide="$Name"></i>\
  `,
    },
    {
      language: 'tsx',
      title: 'React',
      code: `import { Icon } from 'lucide-react';
import { $CamelCase } from '@lucide/lab';

const App = () => {
  return (
    <Icon iconNode={$CamelCase} />
  );
};

export default App;
`,
    },
    {
      language: 'vue',
      title: 'Vue',
      code: `<script setup>
import { Icon } from 'lucide-vue-next';
import { $CamelCase } from '@lucide/lab';
</script>

<template>
  <Icon :iconNode="$CamelCase" />
</template>
`,
    },
    {
      language: 'svelte',
      title: 'Svelte',
      code: `<script>
import { Icon } from 'lucide-svelte';
import { $CamelCase } from '@lucide/lab';
</script>

<Icon iconNode={$CamelCase} />
`,
    },
    {
      language: 'tsx',
      title: 'Preact',
      code: `import { Icon } from 'lucide-preact';
import { $CamelCase } from '@lucide/lab';

const App = () => {
  return (
    <Icon iconNode={$CamelCase} />
  );
};

export default App;
`,
    },
    {
      language: 'tsx',
      title: 'Solid',
      code: `import { Icon } from 'lucide-solid';
import { $CamelCase } from '@lucide/lab';

const App = () => {
  return (
    <Icon iconNode={$CamelCase} />
  );
};

export default App;
`,
    },
    {
      language: 'tsx',
      title: 'Angular',
      code: `// app.module.ts
import { LucideAngularModule } from 'lucide-angular';
import { $CamelCase } from '@lucide/lab';

@NgModule({
  imports: [
    LucideAngularModule.pick({ $CamelCase })
  ],
})

// app.component.html
<lucide-icon name="$CamelCase"></lucide-icon>
`,
    },
  ];
};

export type ThemeOptions =
  | ThemeRegistration
  | { light: ThemeRegistration; dark: ThemeRegistration };

const highLightCode = async (code: string, lang: string, active?: boolean) => {
  const highlighter = await createHighlighter({
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
