import {TabsProps, Tab, TabList, TabPanel, TabPanels, Tabs, BoxProps} from '@chakra-ui/react'
import {IconEntity} from "../types";
import CodeBlock from "./CodeBlock";
import {Language} from "prism-react-renderer";

interface IconCodeExamplesProps extends BoxProps {
  icon: IconEntity;
}

type CodeExampleType = {
  title: string,
  codes: {
    language?: Language,
    code: string,
    metastring?: string,
  }[],
  breakpoint: 'base'|'sm'|'md',
};

function IconCodeExamples({icon}: IconCodeExamplesProps) {
  const camelCaseName = icon.name.replace(/-./g, match => match[1].toUpperCase());
  const upperCamelCaseName = camelCaseName.substr(0, 1).toUpperCase() + camelCaseName.substr(1);

  const codes: CodeExampleType[] = [
    {
      title: 'HTML',
      codes: [
        {
          language: 'markup',
          code: `<i icon-name="${icon.name}"></i>
`,
        },
      ],
      breakpoint: 'base',
    },
    {
      title: 'React',
      codes: [
        {
          language: 'tsx',
          code: `import { ${upperCamelCaseName} } from 'lucide-react';

const App = () => {
  return <${upperCamelCaseName} color="red" size={48} strokeWidth={1.5} />;
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
      breakpoint: 'base',
    },
    {
      title: 'Vue 3',
      codes: [
        {
          language: 'markup',
          code: `<template>
  <${upperCamelCaseName} color="red" :size="32" />
</template>

<script setup>
import { ${upperCamelCaseName} } from 'lucide-vue-next';
</script>
`,
          metastring: '{2,6}',
        },
      ],
      breakpoint: 'base',
    },
    {
      title: 'Svelte',
      codes: [
        {
          language: 'markup',
          code: `<script>
import { ${upperCamelCaseName} } from 'lucide-svelte';
</script>

<${upperCamelCaseName} color="#ff3e98" size="48" strokeWidth="1.5" />
`,
          metastring: '{2,5}',
        },
      ],
      breakpoint: 'sm',
    },
    {
      title: 'Preact',
      codes: [
        {
          language: 'tsx',
          code: `import { ${upperCamelCaseName} } from 'lucide-preact';

const App = () => {
  return <${upperCamelCaseName} color="red" size={48} strokeWidth={1.5} />;
};

export default App;
`,
          metastring: '{1,4}',
        },
      ],
      breakpoint: 'md',
    },
    {
      title: 'Angular',
      codes: [
        {
          language: 'tsx',
          code: `// app.module.ts
import { LucideAngularModule, ${upperCamelCaseName} } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ ${upperCamelCaseName} })
  ],
})
`,
          metastring: '{2,6}',
        },
        {
          language: 'markup',
          code: `<!-- app.component.html -->
<lucide-icon name="${icon.name}"></lucide-icon>
`,
          metastring: '{2}',
        },
      ],
      breakpoint: 'base',
    },
    {
      title: 'TTF',
      codes: [
        {
          language: 'css',
          code: `@import ('~lucide-static/font/Lucide.css');
`,
        },
        {
          language: 'markup',
          code: `<div class="icon-${icon.name}"></div>
`,
        },
      ],
      breakpoint: 'md',
    },
    {
      title: 'Flutter',
      codes: [
        {
          language: 'javascript',
          code: `Icon(LucideIcons.${icon.name});
`,
          metastring: '{1}',
        },
      ],
      breakpoint: 'sm',
    },
  ];

  return (
    <Tabs style={{maxWidth: '100%', width: '100%'}} colorScheme='brand'>
      <TabList>
        {codes.map((code, index) => {
          return (
            <Tab
              px={2} pb={0}
              display={{
                base: code.breakpoint=='base' ? 'block' : 'none',
                sm: code.breakpoint=='sm' || code.breakpoint=='base' ? 'block' : 'none',
                md: code.breakpoint=='md' || code.breakpoint=='sm' || code.breakpoint=='base' ? 'block' : 'none',
                lg: 'block',
              }}
              key={`code-tab-${index}`}
            >{code.title}</Tab>
          )
        })}
      </TabList>

      <TabPanels mt={2}>
        {codes.map((code, index) => {
          return (
            <TabPanel p={0} h="100%"
                      key={`code-tab-panel-${index}`}>
              {code.codes.map((part, index2) => {
                return (
                  <CodeBlock
                    showCopyButton={false}
                    code={part.code}
                    language={part.language}
                    metastring={part.metastring ?? null}
                    marginBottom={2}
                    key={`code-tab-panel-${index}-snippet-${index2}`}
                  />
                )
              })}
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  );
}

export default IconCodeExamples;
