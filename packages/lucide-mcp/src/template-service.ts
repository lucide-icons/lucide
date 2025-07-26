import type { FlavourTemplate, SupportedFlavour, TemplateContext } from './types';

// Simple utility function to avoid dependency issues
function toPascalCase(str: string): string {
  return str
    .replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
      p2 ? p2.toUpperCase() : p1.toLowerCase(),
    )
    .replace(/^./, match => match.toUpperCase());
}

export class TemplateService {
  private base64SVG(svgContent: string): string {
    return Buffer.from(svgContent).toString('base64');
  }

  private parseSvgChildren(svgContent: string): any[] {
    // Simple parser to extract path elements and other children from SVG
    const children: any[] = [];
    const pathMatches = svgContent.match(/<path[^>]*>/g) || [];
    const circleMatches = svgContent.match(/<circle[^>]*>/g) || [];
    const lineMatches = svgContent.match(/<line[^>]*>/g) || [];
    const rectMatches = svgContent.match(/<rect[^>]*>/g) || [];
    const polygonMatches = svgContent.match(/<polygon[^>]*>/g) || [];
    const polylineMatches = svgContent.match(/<polyline[^>]*>/g) || [];

    const parseAttributes = (element: string): Record<string, string> => {
      const attrs: Record<string, string> = {};
      const attrRegex = /(\w+(?:-\w+)*)="([^"]*)"/g;
      let match;
      while ((match = attrRegex.exec(element)) !== null) {
        attrs[match[1]] = match[2];
      }
      return attrs;
    };

    pathMatches.forEach(path => {
      children.push(['path', parseAttributes(path)]);
    });

    circleMatches.forEach(circle => {
      children.push(['circle', parseAttributes(circle)]);
    });

    lineMatches.forEach(line => {
      children.push(['line', parseAttributes(line)]);
    });

    rectMatches.forEach(rect => {
      children.push(['rect', parseAttributes(rect)]);
    });

    polygonMatches.forEach(polygon => {
      children.push(['polygon', parseAttributes(polygon)]);
    });

    polylineMatches.forEach(polyline => {
      children.push(['polyline', parseAttributes(polyline)]);
    });

    return children;
  }

  generateTemplate(flavour: SupportedFlavour, iconName: string, svgContent: string): FlavourTemplate {
    const componentName = toPascalCase(iconName);
    const children = this.parseSvgChildren(svgContent);
    const svgBase64 = this.base64SVG(svgContent);

    const context: TemplateContext = {
      componentName,
      iconName,
      children,
      svgContent,
    };

    let code: string;

    switch (flavour) {
      case 'react':
        code = this.generateReactTemplate(context, svgBase64);
        break;
      case 'vue':
        code = this.generateVueTemplate(context, svgBase64);
        break;
      case 'vue-next':
        code = this.generateVueNextTemplate(context, svgBase64);
        break;
      case 'angular':
        code = this.generateAngularTemplate(context, svgBase64);
        break;
      case 'svelte':
        code = this.generateSvelteTemplate(context, svgBase64);
        break;
      case 'preact':
        code = this.generatePreactTemplate(context, svgBase64);
        break;
      case 'solid':
        code = this.generateSolidTemplate(context, svgBase64);
        break;
      case 'astro':
        code = this.generateAstroTemplate(context, svgBase64);
        break;
      case 'react-native':
        code = this.generateReactNativeTemplate(context, svgBase64);
        break;
      case 'vanilla':
        code = this.generateVanillaTemplate(context, svgBase64);
        break;
      case 'node':
        code = this.generateNodeTemplate(context, svgBase64);
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

  private generateReactTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateVueTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateVueNextTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateAngularTemplate(context: TemplateContext, svgBase64: string): string {
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

  private generateSvelteTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generatePreactTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateSolidTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateAstroTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateReactNativeTemplate(context: TemplateContext, svgBase64: string): string {
    const { componentName, iconName } = context;

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

  private generateVanillaTemplate(context: TemplateContext, svgBase64: string): string {
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

  private generateNodeTemplate(context: TemplateContext, svgBase64: string): string {
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
