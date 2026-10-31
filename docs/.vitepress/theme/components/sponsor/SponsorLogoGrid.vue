<script setup lang="ts">
import { computed } from 'vue';
import { getSponsorsByTier } from './sponsors';
import { getTier } from './tiers';

type LogoTier = 'platinum' | 'gold' | 'bronze';
type Size = 'lg' | 'md' | 'sm';

const defaultSizes: Record<LogoTier, Size> = {
  platinum: 'lg',
  gold: 'md',
  bronze: 'sm',
};

const props = withDefaults(
  defineProps<{
    tier: LogoTier;
    /** Defaults to the tier name. */
    title?: string;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    size?: Size;
    /**
     * Number of "Your logo here" slots to fill up to. Without placeholders the grid
     * renders nothing while the tier has no sponsors.
     */
    placeholders?: number;
  }>(),
  {
    headingLevel: 3,
    placeholders: 0,
  },
);

const sponsors = getSponsorsByTier(props.tier);

const placeholderCount = computed(() => Math.max(props.placeholders - sponsors.length, 0));
const headingElement = computed(() => `h${props.headingLevel}`);
const sizeClass = computed(() => props.size ?? defaultSizes[props.tier]);
</script>

<template>
  <div
    v-if="sponsors.length || placeholderCount"
    class="logo-grid"
  >
    <component
      :is="headingElement"
      class="title"
    >
      {{ title ?? getTier(tier).name }}
    </component>
    <div
      class="tiles"
      :class="sizeClass"
    >
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.slug"
        :href="sponsor.website"
        target="_blank"
        rel="noreferrer noopener"
        class="tile"
      >
        <img
          :src="sponsor.image"
          :alt="sponsor.name"
          class="logo"
          loading="lazy"
        />
      </a>
      <a
        v-for="index in placeholderCount"
        :key="`placeholder-${index}`"
        href="/sponsor#tiers"
        class="tile placeholder"
      >
        Your logo here
      </a>
    </div>
  </div>
</template>

<style scoped>
.logo-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tiles {
  display: grid;
  gap: 12px;
}

.tiles.lg {
  grid-template-columns: 1fr;
}

.tiles.md {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.tiles.sm {
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: border-color 0.25s;
}

.tile:hover {
  border-color: var(--vp-c-brand-1);
}

.lg .tile {
  min-height: 120px;
}

.md .tile {
  min-height: 96px;
}

.sm .tile {
  min-height: 72px;
}

.logo {
  max-width: 70%;
  object-fit: contain;
}

.lg .logo {
  max-height: 72px;
}

.md .logo {
  max-height: 56px;
}

.sm .logo {
  max-height: 40px;
}

.placeholder {
  background-color: transparent;
  border: 2px dashed var(--vp-c-border);
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 600;
}

.lg .placeholder {
  font-size: 16px;
}
</style>
