import { toCamelCase } from '@lucide/shared';
import type { FlavourTemplate, SupportedFlavour, TemplateContext } from './types';

export class TemplateService {
  generateTemplate(flavour: SupportedFlavour, iconName: string): FlavourTemplate {

    const camelCase = toCamelCase(iconName);
    const componentName = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);

    const context: TemplateContext = {
      componentName,
      iconName,
    };

    let code: string;

    switch (flavour) {
      case 'react':
        code = this.generateReactTemplate(context);
        break;
      case 'vue':
        code = this.generateVueTemplate(context);
        break;
      case 'vue-next':
        code = this.generateVueNextTemplate(context);
        break;
      case 'angular':
        code = this.generateAngularTemplate(context);
        break;
      case 'svelte':
        code = this.generateSvelteTemplate(context);
        break;
      case 'preact':
        code = this.generatePreactTemplate(context);
        break;
      case 'solid':
        code = this.generateSolidTemplate(context);
        break;
      case 'astro':
        code = this.generateAstroTemplate(context);
        break;
      case 'react-native':
        code = this.generateReactNativeTemplate(context);
        break;
      case 'vanilla':
        code = this.generateVanillaTemplate(context);
        break;
      case 'node':
        code = this.generateNodeTemplate(context);
        break;
      default:
        throw new Error(`Unsupported flavour: ${flavour}`);
    }

    return {
      flavour,
      componentName,
      code
    };
  }

  private generateReactTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `import { ${componentName} } from 'lucide-react';

// Usage
const App = () => {
  return <${componentName} color="red" size={48} />;
};

// With additional props
const ExampleComponent = () => {
  return (
    <${componentName}
      color="currentColor"
      size={24}
      strokeWidth={2}
      absoluteStrokeWidth={false}
    />
  );
};

export default App;`;
  }

  private generateVueTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `<!-- Vue 2 -->
<script>
import { ${componentName} } from 'lucide-vue';

export default {
  components: {
    ${componentName}
  }
}
</script>

<template>
  <${componentName} :size="24" color="currentColor" />
  <${componentName} color="red" :size="48" />
</template>`;
  }

  private generateVueNextTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `<!-- Using composition API -->
<script setup>
import { ${componentName} } from 'lucide-vue-next';
</script>

<template>
  <${componentName} :size="24" color="currentColor" />
  <${componentName} color="red" :size="48" />
</template>

<!-- Using options API -->
<script>
import { ${componentName} } from 'lucide-vue-next';

export default {
  components: {
    ${componentName}
  }
}
</script>`;
  }

  private generateAngularTemplate(context: TemplateContext): string {
    const { componentName, iconName } = context;

    return `// app.module.ts
import { LucideAngularModule, ${componentName} } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ ${componentName} })
  ],
})

// app.component.html
<lucide-icon name="${iconName}"></lucide-icon>

// With properties
<lucide-icon name="${iconName}" class="my-icon" size="24" color="currentColor"></lucide-icon>

// Alternative tags
<lucide-angular name="${iconName}"></lucide-angular>
<i-lucide name="${iconName}"></i-lucide>
<span-lucide name="${iconName}"></span-lucide>`;
  }

  private generateSvelteTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `<script>
  import { ${componentName} } from 'lucide-svelte';
</script>

<!-- Usage -->
<${componentName} />

<!-- With props -->
<${componentName} size={24} color="currentColor" strokeWidth={2} />

<!-- With custom styling -->
<${componentName} class="my-icon" size={48} color="red" />`;
  }

  private generatePreactTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `import { ${componentName} } from 'lucide-preact';

// Usage
const App = () => {
  return <${componentName} color="red" size={48} />;
};

// With additional props
const ExampleComponent = () => {
  return (
    <${componentName}
      color="currentColor"
      size={24}
      strokeWidth={2}
      absoluteStrokeWidth={false}
    />
  );
};

export default App;`;
  }

  private generateSolidTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `import { ${componentName} } from 'solid-lucide';

// Usage
const App = () => {
  return <${componentName} color="red" size={48} />;
};

// With additional props
const ExampleComponent = () => {
  return (
    <${componentName}
      color="currentColor"
      size={24}
      stroke-width={2}
    />
  );
};

export default App;`;
  }

  private generateAstroTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `---
// Component script (runs during build)
---
<script>
  import { ${componentName} } from 'lucide-astro';
</script>

<!-- Usage -->
<${componentName} />

<!-- With props -->
<${componentName} size={24} color="currentColor" />

<!-- With custom styling -->
<${componentName} class="my-icon" size={48} color="red" />`;
  }

  private generateReactNativeTemplate(context: TemplateContext): string {
    const { componentName } = context;

    return `import { ${componentName} } from 'lucide-react-native';

// Usage
const App = () => {
  return <${componentName} color="red" size={48} />;
};

// With additional props
const ExampleComponent = () => {
  return (
    <${componentName}
      color="currentColor"
      size={24}
      strokeWidth={2}
    />
  );
};

export default App;`;
  }

  private generateVanillaTemplate(context: TemplateContext): string {
    const { componentName, iconName } = context;

    return `// Using ES modules
import { ${componentName} } from 'lucide';

// Create icon element
const iconElement = ${componentName};

// Add to page
document.body.appendChild(iconElement);

// Using CDN
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<script>
  // Create icon element
  const iconElement = lucide.createElement('${iconName}');

  // Add to page
  document.body.appendChild(iconElement);
</script>

// Replace existing icon
<i data-lucide="${iconName}"></i>
<script>
  lucide.createIcons();
</script>`;
  }

  private generateNodeTemplate(context: TemplateContext): string {
    const { componentName, iconName } = context;

    return `// Using lucide-static for Node.js
const { ${componentName} } = require('lucide-static');

// Get SVG string
const svgString = ${componentName};
console.log(svgString);

// Using ES modules
import { ${componentName} } from 'lucide-static';

// Get SVG content
const svgContent = ${componentName};

// Example: Save to file
const fs = require('fs');
fs.writeFileSync('${iconName}.svg', svgContent);

// Example: Use in HTML template
const html = \`
  <div class="icon-container">
    \${svgContent}
  </div>
\`;`;
  }

  getSupportedFlavours(): SupportedFlavour[] {
    return [
      'react',
      'vue',
      'vue-next',
      'angular',
      'svelte',
      'preact',
      'solid',
      'astro',
      'react-native',
      'vanilla',
      'node'
    ];
  }
}
