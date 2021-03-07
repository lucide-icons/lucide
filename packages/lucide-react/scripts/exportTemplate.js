export default ({ componentName, node }) => `
import createReactComponent from '../createReactComponent';
import defaultAttributes from '../defaultAttributes';

const ${componentName} = createReactComponent('${componentName}', ['svg', defaultAttributes, ${node}]);

export default ${componentName};
`;
