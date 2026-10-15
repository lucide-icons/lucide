<script setup lang="ts">
import { Camera, Droplet, Edit2, House, Pen } from '@lucide/vue';
import LucideProvider from './LucideProvider.vue';
</script>

<template>
  <main aria-label="Lucide integration">
    <Camera data-testid="static-icon" />
    <Droplet
      data-testid="custom-icon"
      class="consumer-icon"
      color="red"
      :size="48"
      :stroke-width="4"
      absolute-stroke-width
    />
    <LucideProvider>
      <House data-testid="provider-icon" />
    </LucideProvider>
    <Pen data-testid="alias-icon" />
    <Edit2 data-testid="canonical-icon" />
  </main>
</template>
