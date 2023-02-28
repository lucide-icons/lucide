export default ({ componentName, children }) => `
import createLucideIcon from '../createLucideIcon';

const ${componentName} = createLucideIcon('${componentName}', ${JSON.stringify(children)});

export default ${componentName};
`;
