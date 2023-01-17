export default ({ componentName, children }) => `
import Icon from '../Icon';
import type { IconNode, LucideProps } from '../types';

const iconNode: IconNode = ${JSON.stringify(children)};

const ${componentName} = (props: LucideProps) => (
  <Icon {...props} name="${componentName}" iconNode={iconNode} />
)

export default ${componentName};
`;
