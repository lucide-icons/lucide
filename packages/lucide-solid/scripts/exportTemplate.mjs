export default ({ componentName, children }) => `
import createSolidComponent from '../createSolidComponent';

const ${componentName} = createSolidComponent('${componentName}', ${JSON.stringify(children)});

export default ${componentName};
`;
