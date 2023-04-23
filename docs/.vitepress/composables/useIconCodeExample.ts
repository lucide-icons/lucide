import { startCase, camelCase } from 'lodash-es'
import { computed, Ref } from 'vue'

type CodeExampleType = Record<string, {
  title: string,
  codes: {
    language?: string,
    code: string,
    metastring?: string,
  }[],
  breakpoint: 'base'|'sm'|'md',
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
      breakpoint: 'base',
    },
    react: {
      title: 'React',
      codes: [
        {
          language: 'tsx',
          code: `import { ${pascalCase} } from 'lucide-react';

const App = () => {
  return (
    <${pascalCase}
      color="red"
      size={48}
      strokeWidth={1.5}
    />
  );
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
      breakpoint: 'base',
    },
    vue: {
      title: 'Vue 3',
      codes: [
        {
          language: 'markup',
          code: `<template>
  <${pascalCase} color="red" :size="32" />
</template>

<script setup>
import { ${pascalCase} } from 'lucide-vue-next';
</script>
`,
          metastring: '{2,6}',
        },
      ],
      breakpoint: 'base',
    },
    svelte: {
      title: 'Svelte',
      codes: [
        {
          language: 'markup',
          code: `<script>
import { ${pascalCase} } from 'lucide-svelte';
</script>

<${pascalCase}
  color="#ff3e98"
  size="48"
  strokeWidth="1.5"
/>
`,
          metastring: '{2,5}',
        },
      ],
      breakpoint: 'sm',
    },
    preact:{
      title: 'Preact',
      codes: [
        {
          language: 'tsx',
          code: `import { ${pascalCase} } from 'lucide-preact';

const App = () => {
  return (
    <${pascalCase}
      color="red"
      size={48}
      strokeWidth={1.5}
    />
  );
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
      breakpoint: 'md',
    },
    solid:{
      title: 'Solid',
      codes: [
        {
          language: 'tsx',
          code: `import { ${pascalCase} } from 'lucide-solid';

const App = () => {
  return (
    <${pascalCase}
      color="red"
      size={48}
      strokeWidth={1.5}
    />
  );
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
      breakpoint: 'md',
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
          metastring: '{2,6}',
        },
      ],
      breakpoint: 'base',
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
      breakpoint: 'md',
    },
    flutter: {
      title: 'Flutter',
      codes: [
        {
          language: 'javascript',
          code: `Icon(LucideIcons.${name});
`,
          metastring: '{1}',
        },
      ],
      breakpoint: 'sm',
    },
  };
}

export default function useIconCodeExamples(name: string) {
  return computed(() => getIconCodes(name))
}
