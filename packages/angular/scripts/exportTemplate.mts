import base64SVG from '@lucide/build-icons/utils/base64SVG';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';
import { toPascalCase } from '@lucide/helpers';

export default defineExportTemplate(async ({
  componentName,
  iconName,
  children,
  getSvg,
  deprecated,
  deprecationReason,
  aliases = [],
}) => {
  const svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);
  const angularComponentName = `Lucide${componentName}`;
  const selectors = [`svg[lucide${toPascalCase(iconName)}]`];
  const aliasComponentNames: string[] = [];
  const aliasNames = aliases.map(alias => typeof alias === 'string' ? alias : alias.name);
  for (const alias of aliasNames) {
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
import { LucideIconData } from '../types';
import { LucideIconBase } from '../lucide-icon-base';
import { Component, signal } from '@angular/core';

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
  templateUrl: '../lucide-icon.html',
  standalone: true,
})
export class ${angularComponentName} extends LucideIconBase {
  static readonly icon: LucideIconData = ${JSON.stringify({
    name: iconName,
    node: children,
    ...(aliasNames.length > 0 && { aliases: aliasNames }),
  })};
  protected override readonly icon = signal(${angularComponentName}.icon);
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
