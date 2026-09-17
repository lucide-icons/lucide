<script lang="ts">
  import FaceSlightlySmiling from '../src/icons/face-slightly-smiling.svelte';
  import { setLucideProps } from '../src/lucide-svelte.js';

  setLucideProps({
    size: 32,
    color: 'red',
    strokeWidth: 1,
    class: 'provider-class',
  });
</script>

<FaceSlightlySmiling aria-label="smile">
  <text>Test</text>
</FaceSlightlySmiling>
