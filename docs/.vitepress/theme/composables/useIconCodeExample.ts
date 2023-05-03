import { startCase, camelCase } from 'lodash-es'
import { computed } from 'vue'

type CodeExampleType = Record<string, {
  title: string,
  codes: {
    language?: string,
    code: string,
    metastring?: string,
  }[],
}>

const getIconCodes = (name: string): CodeExampleType => {
  const pascalCase = startCase(camelCase(name)).replace(/\s/g, '')

  return {
    html: {
      title: 'HTML',
      codes: [
        {
          language: 'markup',
          code: `<i icon-name="${name}"></i>
`,
        },
      ],
    },
    react: {
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
    vue: {
      title: 'Vue 3',
      codes: [
        {
          language: 'markup',
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
    svelte: {
      title: 'Svelte',
      codes: [
        {
          language: 'markup',
          code: `<script>
import { ${pascalCase} } from 'lucide-svelte';
</script>

<${pascalCase}/>
`,
          metastring: '{2,5}',
        },
      ],
    },
    preact:{
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
    solid:{
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
    angular: {
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
    font: {
      title: 'Icon Font',
      codes: [
        {
          language: 'css',
          code: `<style>
@import ('~lucide-static/font/Lucide.css')
</style>

<div class="icon-${name}"></div>
`,
        },
      ],
    },
    flutter: {
      title: 'Flutter',
      codes: [
        {
          language: 'javascript',
          code: `Icon(LucideIcons.${name});
`,
        },
      ],
    },
  };
}

export default function useIconCodeExamples(name: string) {
  return computed(() => getIconCodes(name))
}
