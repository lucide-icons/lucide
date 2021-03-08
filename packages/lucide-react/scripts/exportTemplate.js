export default ({ componentName, iconName }) => `
import _${componentName} from 'lucide/icons/${iconName}';
import createReactComponent from '../createReactComponent';

const ${componentName} = createReactComponent('${componentName}', _${componentName});

export default ${componentName};
`;
