export default ({ componentName, children }) => `
import defaultAttributes from '../defaultAttributes';

const ${componentName} = [
  'svg',
  defaultAttributes,
  ${JSON.stringify(children)}
];

export default ${componentName};
`;
