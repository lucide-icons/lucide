<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  tags?: string[];
}>();

const tags = computed(() => props.tags ?? []);
</script>

<template>
  <div
      class="tags-scroller"
      v-if="tags.length"
    >
      <ul class="icon-tags horizontal-scroller">
        <li v-for="tag in tags" :key="tag" class="tag">{{ tag }}</li>
      </ul>
    </div>
</template>

<style scoped>
.icon-tags {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 28px;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  list-style-type: disc;
  padding-left: 0;
  gap:8px;
}

.tag {
  margin-top: 0;
  padding-left: 0px;
  padding-right: 12px;
  list-style-position: outside;
}

.tag:first-child {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.tags-scroller {
  position: relative;
  max-width: 100%;
  width: 100%;
  height: 28px;
  padding: 8px 0 16px;
  margin-bottom: 16px;
  margin-top: 8px;
  align-items: center;

  --gradient-background: var(--tags-gradient-background, var(--vp-c-bg-elv));
}
.horizontal-scroller {
  overflow-x: scroll;
  /* Hide Scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-width: thin; /* can also be normal, or none, to not render scrollbar */
  scrollbar-color: var(--vp-c-text-4) transparent; /* foreground background */
}
.horizontal-scroller::-webkit-scrollbar {
  width: 0;
  display: none;
}

.horizontal-scroller::-webkit-scrollbar-track {
  background: transparent;
}

.horizontal-scroller::-webkit-scrollbar-thumb {
  background: transparent;
  border: none;
}

.tags-scroller::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 32px;
  height: 100%;
  /* Background Gradient left to right */
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--gradient-background) 100%);
  right: 0;
  pointer-events: none;
}
</style>
