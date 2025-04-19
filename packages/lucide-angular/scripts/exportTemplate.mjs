/* eslint-disable import/no-extraneous-dependencies */
import base64SVG from '@lucide/build-icons/utils/base64SVG.mjs';

export default async ({
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
  let names = {
    [iconName]: componentName,
  };

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
  selector: 'lucide-${iconName}',
  template: '',
  standalone: true,
})
export class ${angularComponentName} extends LucideAngularComponent {
  override icon = ${JSON.stringify(children)} as LucideIconData;
  override name = '${iconName}';
}

${aliases?.map(alias => {
    const aliasName = typeof alias === 'string' ? alias : alias.name;
    const aliasComponentName = toPascalCase(aliasName);

    return `
/**
 * @deprecated
 * @see ${angularComponentName}
 */
@Component({
  selector: 'lucide-${alias}',
  template: '',
  standalone: true,
})
export class Lucide${aliasComponentName}Component extends ${angularComponentName} {
}
`;
  }).join(`\n\n`)}
`;
};
