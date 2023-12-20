export default ({ componentName, children }) => `
import { LucideIconData } from './types';

/* eslint-disable no-shadow-restricted-names */
const ${componentName}: LucideIconData = ${JSON.stringify(children)};

export default ${componentName};
`;
