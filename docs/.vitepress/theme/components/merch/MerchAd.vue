<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { usePreferredReducedMotion } from '@vueuse/core';
import { merchLayoutKey, shuffle, type MerchProduct } from './merch';
import { data } from './merch.data';

const { products: merchProducts, storeUrl: merchStoreUrl } = data;

const MAX_SLIDES = 5;
const SLIDE_INTERVAL = 10_000;

const layout = inject(merchLayoutKey, 'slider');
const reducedMotion = usePreferredReducedMotion();

// Server render and first client render use the build order, shuffled once mounted.
const products = ref<MerchProduct[]>(merchProducts.slice(0, MAX_SLIDES));
const current = ref(0);
const paused = ref(false);

const shown = computed(() => (layout === 'pair' ? products.value.slice(0, 2) : products.value));

let timer: ReturnType<typeof setInterval> | undefined;

function stop() {
  clearInterval(timer);
  timer = undefined;
}

function start() {
  stop();
  if (layout !== 'slider' || products.value.length < 2 || reducedMotion.value === 'reduce') return;
  timer = setInterval(() => {
    if (!paused.value) current.value = (current.value + 1) % products.value.length;
  }, SLIDE_INTERVAL);
}

/** Picking a slide by hand stops the rotation, like the design. */
function pick(index: number) {
  current.value = index;
  stop();
}

/** Called by the ad slot on route change, the same moment Carbon refreshes its ad. */
function next() {
  if (products.value.length > 1) current.value = (current.value + 1) % products.value.length;
}

defineExpose({ next });

onMounted(() => {
  products.value = shuffle(merchProducts).slice(0, MAX_SLIDES);
  start();
});

onBeforeUnmount(stop);
</script>

<template>
  <div
    class="merch-ad"
    :class="`merch-ad--${layout}`"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <span class="merch-label">Support the project</span>

    <a
      v-if="shown.length === 0"
      class="merch-store"
      :href="merchStoreUrl"
      target="_blank"
      rel="noopener"
    >
      <span class="merch-name">Lucide merch</span>
      <span class="merch-price">Shop merch.lucide.dev</span>
    </a>

    <div
      v-else-if="layout === 'slider'"
      class="merch-slides"
    >
      <a
        v-for="(product, index) in shown"
        :key="product.slug"
        class="merch-item"
        :class="{ active: index === current }"
        :href="product.url"
        :aria-hidden="index !== current"
        :tabindex="index === current ? 0 : -1"
        target="_blank"
        rel="noopener"
      >
        <img
          :src="product.image"
          alt=""
          width="184"
          height="245"
          :loading="index === 0 ? 'eager' : 'lazy'"
        />
        <span class="merch-info">
          <span class="merch-name">{{ product.name }}</span>
          <span class="merch-price">{{ product.price }}</span>
        </span>
      </a>
    </div>

    <div
      v-else
      class="merch-pair"
    >
      <a
        v-for="product in shown"
        :key="product.slug"
        class="merch-item"
        :href="product.url"
        target="_blank"
        rel="noopener"
      >
        <img
          :src="product.image"
          alt=""
          width="219"
          height="292"
          loading="lazy"
        />
        <span class="merch-info">
          <span class="merch-name">{{ product.name }}</span>
          <span class="merch-price">{{ product.price }}</span>
        </span>
      </a>
    </div>

    <div
      v-if="layout === 'slider' && shown.length > 1"
      class="merch-dots"
    >
      <button
        v-for="(product, index) in shown"
        :key="product.slug"
        type="button"
        :aria-label="`Show ${product.name}`"
        :aria-current="index === current"
        @click="pick(index)"
      >
        <span :class="{ active: index === current }" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.merch-ad {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-carbon-ads-bg-color);
  text-align: left;
}

.merch-label {
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-carbon-ads-poweredby-color);
}

.merch-slides {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
}

.merch-slides .merch-item {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 800ms ease;
}

.merch-slides .merch-item.active {
  opacity: 1;
  pointer-events: auto;
}

.merch-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.merch-pair .merch-item {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
}

.merch-item {
  display: block;
  color: inherit;
  text-decoration: none;
}

.merch-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: transform 0.4s ease;
}

.merch-item:hover img {
  transform: scale(1.03);
}

.merch-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 14px 12px;
  background: color-mix(in srgb, var(--vp-c-bg-alt, #161618), transparent 50%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  mask-image: linear-gradient(to top, #000 calc(100% - 16px), #0000 100%);
  -webkit-mask-image: linear-gradient(to top, #000 calc(100% - 16px), #0000 100%);
}

.merch-name {
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.merch-price {
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.merch-store {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  min-height: 160px;
  padding: 14px;
  border-radius: 10px;
  background-color: var(--vp-c-bg-alt);
  text-decoration: none;
}

.merch-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-bottom: -6px;
}

.merch-dots button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.merch-dots span {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: var(--vp-c-gray-1);
  transition:
    width 300ms ease,
    background-color 300ms ease;
}

.merch-dots span.active {
  width: 16px;
  background-color: var(--vp-c-text-1);
}

.merch-dots button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
  border-radius: 6px;
}

@media (prefers-reduced-motion: reduce) {
  .merch-slides .merch-item,
  .merch-item img,
  .merch-dots span {
    transition: none;
  }
}
</style>
