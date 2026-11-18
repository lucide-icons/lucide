<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const MAX_VISIBLE_TAGS = 5;

const props = defineProps<{
  tags?: string[];
}>();

const tags = computed(() => props.tags ?? []);
const expanded = ref(false);
const hiddenCount = computed(() => Math.max(tags.value.length - MAX_VISIBLE_TAGS, 0));
const showAll = computed(() => expanded.value || hiddenCount.value === 0);

// The overlay reuses this component when switching icons, so collapse again
watch(tags, () => {
  expanded.value = false;
});
</script>

<template>
  <ul
    v-if="tags.length"
    class="icon-tags"
  >
    <!-- v-show keeps hidden tags in the rendered HTML so crawlers can index them -->
    <li
      v-for="(tag, index) in tags"
      v-show="showAll || index < MAX_VISIBLE_TAGS"
      :key="tag"
      class="tag"
    >
      {{ tag }}
    </li>
    <li
      v-if="!showAll"
      class="more"
    >
      <button
        type="button"
        class="more-button"
        :aria-label="`Show ${hiddenCount} more tags`"
        @click="expanded = true"
      >
        +{{ hiddenCount }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.icon-tags {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style-type: disc;
  gap: 4px 8px;
  /* Clip bullets hanging before tags that start a wrapped line, padding leaves room for the focus ring */
  overflow: hidden;
  padding: 4px;
  margin: 4px -4px 12px;
}

.tag {
  margin-top: 0;
  padding-left: 0px;
  padding-right: 12px;
  list-style-position: outside;
  white-space: nowrap;
}

.tag:first-child {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.more {
  margin-top: 0;
  list-style: none;
}

.more-button {
  font: inherit;
  color: var(--vp-c-text-2);
  font-size: 12px;
  padding: 0 8px;
  margin-left: -4px;
  border-radius: 16px;
  background-color: var(--vp-c-bg-alt);
  transition:
    color 0.25s,
    background-color 0.25s;
}

.more-button:hover,
.more-button:focus-visible {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.more-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
