<script setup lang="ts">
import { ref, onMounted, computed, markRaw, shallowReadonly, watch } from 'vue';
import {
  bird,
  squirrel,
  rabbit,
  ghost,
  castle,
  drama,
  dog,
  cat,
  wandSparkles,
  save,
  snowflake,
  cake,
  fish,
  turtle,
  rat,
  worm,
  testTubeDiagonal,
  sword,
} from '../../../data/iconNodes';
import createLucideIcon from '@lucide/vue/src/createLucideIcon';
import { useEventListener } from '@vueuse/core';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { IconNode } from '../../types';

const { searchQuery, isBrandSearch } = defineProps<{
  searchQuery: string;
  isBrandSearch: boolean;
}>();

defineEmits(['clear']);

interface Placeholder {
  title: string;
  message: string;
  icon: IconNode;
  finePrint?: string;
}

const brandPlaceholders: Placeholder[] = shallowReadonly([
  {
    title: 'Boooo! What a scary brand logo!',
    message:
      '[name] and its friends often haunt this search box, but you won’t ever find them here.',
    icon: markRaw(ghost),
  },
  {
    title: 'Thank You Mario!',
    message: 'But [name] is in another castle!',
    icon: markRaw(castle),
  },
  {
    title: '[name] did audition for our icon set',
    message: '...but didn’t make the callback.',
    icon: markRaw(drama),
  },
  {
    title: 'Such Search. Very [name].',
    message: 'Much not here. So Wow.',
    icon: markRaw(dog),
  },
  {
    title: 'I Can Has [name]?',
    message: 'No [name] for you in here.',
    icon: markRaw(cat),
  },
  {
    title: 'Loading [name]...',
    message: 'Fatal error: our cartridge contains only open-source pixels.',
    icon: markRaw(save),
  },
  {
    title: '[name] Shall Not Pass',
    message: 'Do not look to its coming at first light of any day.',
    icon: markRaw(wandSparkles),
  },
  {
    title: 'Winter is coming',
    message: 'But [name] sure isn’t.',
    icon: markRaw(snowflake),
  },
  {
    title: 'The cake is a lie',
    message: 'And so is the promise of an icon for [name] at Lucide.',
    icon: markRaw(cake),
  },
  {
    title: 'It’s not a bug',
    message: 'Having no [name] icon around is a feature.',
    icon: markRaw(worm),
  },
  {
    title: 'The lab exploded',
    message: 'We tried mixing [name] with open-source icons.',
    icon: markRaw(testTubeDiagonal),
  },
  {
    title: 'It’s Dangerous to Go Alone',
    message: 'Take this icon instead — it’s not [name], but it might help.',
    icon: markRaw(sword),
  },
]);

const notFoundPlaceholders: Omit<Placeholder, 'title'>[] = shallowReadonly([
  {
    message: 'We’ve looked for this icon for a bird’s eye view, but could not find it.',
    icon: markRaw(bird),
  },
  {
    message: 'We checked every tree. Only acorns, no results.',
    icon: markRaw(squirrel),
  },
  {
    message: 'You’ve gone too deep into the rabbit hole — this icon doesn’t exist.',
    icon: markRaw(rabbit),
  },
  {
    message: 'This icon seems to have slipped through the net.',
    icon: markRaw(fish),
  },
  {
    message: 'This icon might exist in the future… but it hasn’t arrived yet.',
    icon: markRaw(turtle),
  },
  {
    message: 'Rats! This icon seems to have slipped through the cracks.',
    icon: markRaw(rat),
  },
]);

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const placeholderIcon = ref<HTMLElement>();
const placeholder = ref<Placeholder>();

watch(
  () => isBrandSearch,
  () => {
    placeholder.value = isBrandSearch
      ? {
          ...randomItem(brandPlaceholders),
          finePrint:
            'Lucide does not accept brand logos, and we do not plan to add them in the future. This is due to a combination of legal restrictions, design consistency concerns, and practical maintenance reasons.',
        }
      : {
          title: `No results for “[name]”`,
          finePrint:
            'This icon doesn’t seem to exist… yet. Try searching similar terms, browsing existing requests, or opening a new one.',
          ...randomItem(notFoundPlaceholders),
        };
  },
  { immediate: true },
);
const iconComponent = computed(() => createLucideIcon('placeholder', placeholder.value.icon));
const flip = ref(false);

onMounted(() => {
  useEventListener(document, 'mousemove', (mouseEvent) => {
    const { width, x } = placeholderIcon.value.getBoundingClientRect();

    const centerX = width / 2 + x;

    flip.value = !isBrandSearch && mouseEvent.x < centerX;
  });
});
</script>

<template>
  <div class="no-results">
    <component
      :is="iconComponent"
      class="placeholder-icon"
      ref="placeholderIcon"
      :class="{ flip }"
      :strokeWidth="1"
    />
    <h2 class="no-results-text">{{ placeholder.title.replace('[name]', searchQuery) }}</h2>
    <p class="no-results-message">
      {{ placeholder.message.replace('[name]', searchQuery) }}
    </p>
    <div class="divider"></div>
    <p
      v-if="placeholder.finePrint"
      class="no-results-fine-print"
    >
      {{ placeholder.finePrint }}
    </p>
    <VPButton
      v-if="isBrandSearch"
      text="Head over to Simple Icons"
      theme="brand"
      :href="`https://simpleicons.org/?q=${searchQuery}`"
      target="_blank"
    />
    <VPButton
      v-else
      text="Clear search & try again"
      theme="brand"
      @click="$emit('clear')"
    />
    <span class="text-divider">or</span>
    <VPButton
      v-if="isBrandSearch"
      text="Read our statement on brand logos"
      theme="alt"
      href="https://github.com/lucide-icons/lucide/blob/main/BRAND_LOGOS_STATEMENT.md"
      target="_blank"
    />
    <VPButton
      v-else
      text="Search GitHub issues"
      theme="alt"
      :href="`https://github.com/lucide-icons/lucide/issues?q=is%3Aopen+${searchQuery}`"
      target="_blank"
    />
  </div>
</template>

<style scoped>
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-block: 48px;
}

.placeholder-icon {
  width: 96px;
  height: 96px;
  color: var(--vp-c-text-1);
}

.placeholder-icon.flip {
  transform: rotateY(180deg);
}

.no-results-text {
  line-height: 1.35;
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 8px;
  text-wrap: balance;
}

.no-results-message {
  text-wrap: balance;
}

.no-results-fine-print {
  max-inline-size: 60ch;
  font-size: 14px;
  margin-bottom: 32px;
  color: var(--vp-c-text-2);
  text-wrap: balance;
}

.text-divider {
  margin: 12px 0;
  font-size: 16px;
  color: var(--vp-c-neutral);
}
.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}
</style>
