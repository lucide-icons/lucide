// eslint-disable-next-line import/no-extraneous-dependencies
export default ({ iconName, children }) =>
  `\
<script lang="ts">
import Icon from '../Icon.svelte';
import type { IconNode } from '../types';

const iconNode: IconNode = ${JSON.stringify(children)};
</script>

<Icon name="${iconName}" {...$$props} iconNode={iconNode}>
  <slot/>
</Icon>
`;
