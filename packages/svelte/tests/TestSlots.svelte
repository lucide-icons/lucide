<script lang="ts">
  import Smile from '../src/icons/smile.svelte';
  import type { IconProps } from '../src/types.js';

  const props: IconProps = $props();
</script>

<Smile {...props}>
  <text>Test</text>
</Smile>
