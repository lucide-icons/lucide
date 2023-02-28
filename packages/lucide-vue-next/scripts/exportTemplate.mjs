export default ({ componentName, children }) => `
import createLucideIcon from '../createLucideIcon';

const ${componentName} = createLucideIcon('${componentName}Icon', ${JSON.stringify(children)});

export default ${componentName};
`;
