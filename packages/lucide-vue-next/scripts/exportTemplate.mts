import base64SVG from '@lucide/build-icons/utils/base64SVG';

export default async ({
  componentName,
  iconName,
  children,
  getSvg,
  deprecated,
  deprecationReason,
}) => {
  const svgContents = await getSvg();
  const svgBase64 = base64SVG(svgContents);

  return `
import createLucideIcon from '../createLucideIcon';

/**
 * @component @name ${componentName}
 * @description Lucide SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide-vue-next - Documentation
 *
 * @param {Object} props - Lucide icons props and any valid SVG attribute
 * @returns {FunctionalComponent} Vue component
 * ${deprecated ? `@deprecated ${deprecationReason}` : ''}
 */
const ${componentName} = createLucideIcon('${iconName}', ${JSON.stringify(children)});

export default ${componentName};
`;
};
