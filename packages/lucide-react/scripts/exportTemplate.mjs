export default ({ componentName }) => `
import { ${componentName} as ${componentName}Icon } from 'lucide'
import { createReactComponent } from '../createReactComponent';

const ${componentName} = createReactComponent('${componentName}', ${componentName}Icon[2]);

export default ${componentName};
`;
