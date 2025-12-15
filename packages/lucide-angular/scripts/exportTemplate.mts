import base64SVG from '@lucide/build-icons/utils/base64SVG';
import defineExportTemplate from '@lucide/build-icons/utils/defineExportTemplate';

export default defineExportTemplate(async ({
  componentName,
  iconName,
  children,
  getSvg,
  deprecated,
  deprecationReason,
  aliases = [],
  toPascalCase,
}) => {
  const svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);
  const angularComponentName = `Lucide${componentName}Component`;
  const selectors = [`svg[lucide-${iconName}]`];
  const aliasExports: {[aliasComponentName: string]: boolean} = {};
  for (const alias of aliases) {
    const aliasName = typeof alias === 'string' ? alias : alias.name;
    const aliasComponentName = `Lucide${toPascalCase(aliasName)}Component`;
    const aliasSelector = `svg[lucide-${aliasName}]`;
    selectors.push(aliasSelector);
    if (aliasComponentName !== angularComponentName && !(aliasComponentName in aliasExports)) {
      aliasExports[aliasComponentName] = true;
    }
  }

  return `\
import { LucideIconData } from './types';
import { LucideAngularComponent } from '../lib/lucide-angular.component';
import { Component } from '@angular/core';

/**
 * @component @name ${componentName}
 * @description Lucide SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide-angular - Documentation
 *
 * @param {Object} props - Lucide icons props and any valid SVG attribute
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
*/
@Component({
  selector: '${selectors.join(', ')}',
  template: '',
  standalone: true,
})
export class ${angularComponentName} extends LucideAngularComponent {
  override icon = ${JSON.stringify(children)} as LucideIconData;
  override name = '${iconName}';
}

${Object.entries(aliasExports).map(([aliasComponentName]) => {
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
