<script lang="ts">
  import Smile from '../src/icons/smile.svelte';
  import { setLucideProps } from '../src/lucide-svelte.js';

  setLucideProps({
    size: 32,
    color: 'red',
    strokeWidth: 1,
    class: 'provider-class',
  });
</script>

<Smile aria-label="smile">
  <text>Test</text>
</Smile>
