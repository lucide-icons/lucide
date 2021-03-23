export default ({ componentName, children }) => `
import createVueComponent from '../createVueComponent';

const ${componentName} = createVueComponent('${componentName}Icon', ${JSON.stringify(children)});

export default ${componentName};
`;
