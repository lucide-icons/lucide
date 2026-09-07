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
import { LucideIconBase } from '../lucide-icon-base';
import { lucideIconTemplate } from '../lucide-icon-template';
import { LucideIconData } from '../types';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${angularComponentName} extends LucideIconBase {
  static readonly icon: LucideIconData = ${JSON.stringify(iconData)};
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
