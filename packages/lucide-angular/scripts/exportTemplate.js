export default ({ componentName, children }) => `
import { IconData } from '../../lucide';
import defaultAttributes from '../../default-attributes';

export const ${componentName}: IconData  = [
  'svg',
  defaultAttributes,
  ${JSON.stringify(children)}
];
`;
