<script setup lang="ts">
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

  const props = defineProps<{
    tabs: string[];
  }>();
</script>

<template>
  <TabGroup>
    <TabList class="tab-list">
      <template v-for="(tab, index) in props.tabs" :key="index">
        <Tab :id="`tab-${index}`" class="tab">{{ tab }}</Tab>
      </template>
    </TabList>
    <TabPanels>
      <template v-for="(_, name) in $slots">
        <TabPanel>
          <slot :name="name" />
        </TabPanel>
      </template>
    </TabPanels>
  </TabGroup>
</template>

<style lang="css" scoped>
.tab-list {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab {
  display: block;
  line-height: 32px;
  font-size: 16px;
  padding: 10px 24px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  border-bottom: 2px solid transparent;
}

.tab[aria-selected="true"] {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
  border-bottom: 2px solid var(--vp-c-brand);
}

@media (min-width: 860px) {
  .tab {
    font-size: 18px;
    padding: 10px 16px;
  }
}

@media (min-width: 960px) {
  .tab {
  }
}

@media (min-width: 1152px) {
  .tab {
  }
}
</style>
