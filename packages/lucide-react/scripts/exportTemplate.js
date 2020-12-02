export default ({ componentName, node }) => `
import createReactComponent from '../createReactComponent';

const ${componentName} = createReactComponent('${componentName}', ${node});

export default ${componentName};
`;
