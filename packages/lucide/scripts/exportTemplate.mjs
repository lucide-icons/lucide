export default ({ componentName, children }) => `
import { IconNode } from "../types";
import { DEFAULT_ATTRIBUTES } from '../defaultAttributes';

const ${componentName}: IconNode = [
  'svg',
  DEFAULT_ATTRIBUTES,
  ${JSON.stringify(children)}
];

export default ${componentName};
`;
