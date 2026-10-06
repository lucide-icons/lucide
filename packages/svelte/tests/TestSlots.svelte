<script lang="ts">
  import FaceSlightlySmiling from '../src/icons/face-slightly-smiling.svelte';
  import type { IconProps } from '../src/types.js';

  const props: IconProps = $props();
</script>

<FaceSlightlySmiling {...props}>
  <text>Test</text>
</FaceSlightlySmiling>
