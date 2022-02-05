// eslint-disable-next-line import/no-extraneous-dependencies
import { stringify } from 'svgson';

export default ({ iconName, children }) => {
  const iconChildNodes = children.map(([name, attributes]) => ({ name, attributes, children: [] }));
  const iconChildrenHTML = iconChildNodes.map(stringify).join('\n  ');
  return `\
<script>
import Icon from '../Icon.svelte';
</script>

<Icon name="${iconName}" {...$$props} >
  ${iconChildrenHTML}
  <slot/>
</Icon>
`;
};
