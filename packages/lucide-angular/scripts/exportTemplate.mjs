export default ({ componentName, children }) => `
import { IconData } from './types';
import defaultAttributes from './constants/default-attributes';

/* eslint-disable no-shadow-restricted-names */
const ${componentName}: IconData = [
    'svg',
    defaultAttributes,
    ${JSON.stringify(children)}
];

export default ${componentName};
`;
