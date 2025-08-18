<script lang="ts">
  import { setContext } from 'svelte';
  import Smile from '../src/icons/smile.svelte'
  import { setLucideProps } from '../src/lucide-svelte';

  setLucideProps({
    size: 32,
    color: 'red',
    strokeWidth: 1,
  });
</script>

<Smile aria-label="smile">
  <text>Test</text>
</Smile>
