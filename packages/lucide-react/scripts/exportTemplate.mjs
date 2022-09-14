export default ({ componentName, children }) => `
import createReactComponent from '../createReactComponent';

const ${componentName} = createReactComponent('${componentName}', ${JSON.stringify(children)});

export default ${componentName};
`;
