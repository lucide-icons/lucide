<script setup lang="ts">
import { computed } from 'vue';
import Badge from '../base/Badge.vue';
import WaitlistForm from './WaitlistForm.vue';
import { waitlistProducts } from './products';

const props = defineProps<{
  product: keyof typeof waitlistProducts;
}>();

const config = computed(() => waitlistProducts[props.product]);
</script>

<template>
  <section class="waitlist-hero">
    <div class="inner">
      <div class="intro">
        <Badge class="tag">{{ config.badge }}</Badge>
        <h1 class="title">
          {{ config.titlePrefix }} <span class="accent">{{ config.titleAccent }}</span>
        </h1>
        <p class="subtitle">{{ config.subtitle }}</p>
        <WaitlistForm :product="config" />
      </div>

      <div class="visual">
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.waitlist-hero {
  display: flex;
  align-items: center;
  padding-bottom: 64px;
}

.inner {
  display: flex;
  flex-direction: column-reverse;
  gap: 48px;
  width: 100%;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  margin: 0 auto;
  padding: 0 24px 64px;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 576px;
  margin-inline: auto;

}

.tag {
  padding: 4px 8px;
  line-height: 24px;
  display: none;
}

.title {
  margin: 16px 0 0;
  max-width: 392px;
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: var(--vp-c-text-1);
}

.accent {
  color: var(--vp-c-brand-3);
}

.subtitle {
  margin: 12px 0 32px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.visual {
  display: flex;
  justify-content: center;
  min-width: 0;
  background: var(--vp-sidebar-bg-color);
  margin: 0 -24px;
  border-bottom: 1px solid var(--vp-c-gutter);
}

@media (min-width: 640px) {
  .title {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 768px) {
  .tag {
    display: inline-block;
  }
}

@media (min-width: 960px) {
  .title {
    line-height: 64px;
    font-size: 56px;
  }

  .waitlist-hero {
    min-height: calc(100vh - var(--vp-nav-height) - 113px);
    padding: 80px 32px 64px;
    background: var(--vp-sidebar-bg-color);
  }

  .inner {
    flex-direction: row;
    gap: 24px;
  }

  .intro {
    flex: 0 1 576px;
    margin-inline: 0;
  }

  .visual {
    flex: 1 1 0;
    align-items: center;
    border-bottom: none;
  }
}
</style>
