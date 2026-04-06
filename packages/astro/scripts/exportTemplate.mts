import base64SVG from '@lucide/build-icons/utils/base64SVG';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';

export default defineExportTemplate(
  async ({ componentName, iconName, iconData, getSvg, deprecated, deprecationReason }) => {
    const svgContents = await getSvg();
    const svgBase64 = base64SVG(svgContents);

    // Astro doesn't need keyed children in loops
    const keylessIconData = {
      ...iconData,
      node: iconData.node.map((child) => {
        const [element, { key, ...otherAttrs }] = child;
        return [element, otherAttrs];
      }),
    };

    // TODO: build-icons' `pretty` is set to false as the prettier
    // formatter uses babel which I'm not sure it supports typescript
    return `
import createLucideIcon from '../createLucideIcon';
import type { AstroComponent, LucideIconData } from '../types'

const iconData: LucideIconData = ${JSON.stringify(keylessIconData)};

/**
 * @component @name ${componentName}
 * @description Lucide SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide-astro - Documentation
 *
 * @param {import('../types').IconProps} props - Lucide icons props and any valid SVG attribute
 * @returns {any} Astro Component
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${componentName} = createLucideIcon(iconData) as AstroComponent;

export default ${componentName};
`;
  },
);
