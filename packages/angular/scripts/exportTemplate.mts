import base64SVG from '@lucide/build-icons/utils/base64SVG';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';
import { toPascalCase } from '@lucide/helpers';

export default defineExportTemplate(async ({
  componentName,
  iconName,
  getSvg,
  deprecated,
  deprecationReason,
  iconData,
}) => {
  const svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);
  const angularComponentName = `Lucide${componentName}`;
  const selectors = [`svg[lucide${toPascalCase(iconName)}]`];
  const aliasComponentNames: string[] = [];
  for (const alias of iconData.aliases ?? []) {
    const aliasComponentName = `Lucide${toPascalCase(alias)}`;
    const aliasSelector = `svg[lucide${toPascalCase(alias)}]`;
    if (!selectors.includes(aliasSelector)) {
      selectors.push(aliasSelector);
    }
    if (aliasComponentName !== angularComponentName && !aliasComponentNames.includes(aliasComponentName)) {
      aliasComponentNames.push(aliasComponentName);
    }
  }

  return `\
import { createLucideIcon } from '../create-lucide-icon';
import { lucideIconTemplate } from '../lucide-icon-template';
import { Component } from '@angular/core';

/**
 * @component @name ${componentName}
 * @description Lucide SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/angular - Documentation
 *
 * @param {Object} props - Lucide icons props and any valid SVG attribute
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
*/
@Component({
  selector: '${selectors.join(', ')}',
  template: lucideIconTemplate,
  standalone: true,
})
export class ${angularComponentName} extends createLucideIcon(${JSON.stringify(iconData)}) {
}

${aliasComponentNames.map((aliasComponentName) => {
    return `
/**
 * @deprecated
 * @see ${angularComponentName}
 */
export const ${aliasComponentName} = ${angularComponentName};
`;
  }).join(`\n\n`)}
`;
});
