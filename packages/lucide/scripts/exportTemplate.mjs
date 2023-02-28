export default ({ componentName, children }) => `
import defaultAttributes from '../defaultAttributes';
import type { IconNode } from '../types';

const ${componentName}: IconNode = [
  'svg',
  defaultAttributes,
  ${JSON.stringify(children)}
];

export default ${componentName};
`;
