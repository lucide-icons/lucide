<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setLucideProps } from '@lucide/svelte';

  const { children }: { children: Snippet } = $props();

  setLucideProps({ color: 'purple', size: 32, strokeWidth: 3 });
</script>

{@render children()}
