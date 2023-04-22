<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IconEntity, Category } from '../types'
import IconItem from './IconItem.vue'
import IconDetailOverlay from './IconDetailOverlay.vue'
import IconGrid from './IconGrid.vue'

const props = defineProps<{
  icons: IconEntity[]
  categories: Category[]
}>()

const activeIconName = ref('')

function setActiveIconName(name: string) {
  console.log('activeIcon', name);

  activeIconName.value = name
}



const categories = computed(() => {
  if( !props.categories?.length || !props.icons?.length ) return []
  return props.categories.map(({ name, title }) => {
    const categoryIcons = props.icons.filter(({ categories }) => categories.includes(name))

    // const isSearching = icons.length !== data.length;
    // const searchResults = isSearching
    //   ? categoryIcons.filter(icon => icons.some((item) => item?.name === icon?.name))
    //   : categoryIcons;

    return {
      title,
      name,
      icons: categoryIcons,
      // isActive: name === activeCategory,
    };
  })
})

const activeIcon = computed(() =>
  props.icons?.find((icon) => icon.name === activeIconName.value)
)

</script>

<template>
  <section class="category" v-for="category in categories" :key="category.name">
      <h2 class="title" :id="category.name">
        <a class="header-anchor" :href="`#${category.name}`" :aria-label="`Permalink to &quot;${category.title}&quot;`">&ZeroWidthSpace;</a>
        {{ category.title }}
      </h2>
      <IconGrid :activeIcon="activeIconName" :icons="category.icons" @setActiveIcon="setActiveIconName"/>
    </section>
  <IconDetailOverlay :icon="activeIcon" @close="setActiveIconName('')"/>
</template>

<style scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  /* padding: 32px 32px 96px; */
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
}

.title {
  margin-bottom: 24px;
  font-size: 19px;
}

.category {
  margin-bottom: 32px;
}
</style>
