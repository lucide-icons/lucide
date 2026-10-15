<script lang="ts">
  import { Camera, Droplet, Edit2, House, Pen } from '@lucide/svelte';
  import LucideProvider from './LucideProvider.svelte';
</script>

<main aria-label="Lucide integration">
  <Camera data-testid="static-icon" />
  <Droplet
    data-testid="custom-icon"
    class="consumer-icon"
    color="red"
    size={48}
    strokeWidth={4}
    absoluteStrokeWidth
  />
  <LucideProvider>
    <House data-testid="provider-icon" />
  </LucideProvider>
  <Pen data-testid="canonical-icon" />
  <Edit2 data-testid="alias-icon" />
</main>
