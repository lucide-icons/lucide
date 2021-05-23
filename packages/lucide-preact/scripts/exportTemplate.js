export default ({ componentName, children }) => `
import createPreactComponent from '../createPreactComponent';

const ${componentName} = createPreactComponent('${componentName}', ${JSON.stringify(children)});

export default ${componentName};
`;
