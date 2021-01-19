export default ({ componentName, node }) => `
import createVueComponent from '../createVueComponent';
import defaultAttributes from '../defaultAttributes';

const ${componentName} = createVueComponent('${componentName}', ['svg', defaultAttributes, ${node}]);

export default ${componentName};
`;
