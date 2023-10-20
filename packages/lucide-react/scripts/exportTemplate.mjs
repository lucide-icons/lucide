export default ({ componentName, iconName, children, getSvg }) => {
  const svgContents = getSvg();

  const svgBase64 = Buffer.from(
    svgContents
      .replace('\n', '')
      .replace(
        'stroke="currentColor"',
        'stroke="#000" style="background-color: #fff; border-radius: 2px"',
      ),
  ).toString('base64');

  // declarationFileContent += `\

  return `
import createLucideIcon from '../createLucideIcon';

/**
 * @component @name ${componentName}
 * @description Lucide SVG icon component, renders SVG Element with children.
 *
 * @preview ![img](data:image/svg+xml;base64,${svgBase64}) - https://lucide.dev/icons/${iconName}
 * @see https://lucide.dev/guide/packages/lucide-react - Documentation
 *
 * @param {Object} props - Lucide icons props and any valid SVG attribute
 * @returns {JSX.Element} JSX Element
 *
 */
const ${componentName} = createLucideIcon('${componentName}', ${JSON.stringify(children)});

export default ${componentName};
`;
};
