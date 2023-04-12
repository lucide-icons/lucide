export default ({ componentName, children }) => `
import { LucideIconData } from './types';
import defaultAttributes from './constants/default-attributes';

/* eslint-disable no-shadow-restricted-names */
const ${componentName}: LucideIconData = [
    'svg',
    defaultAttributes,
    ${JSON.stringify(children)}
];

export default ${componentName};
`;
