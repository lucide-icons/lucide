<script setup lang="ts">
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import { computed, ref } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'
import { chevronUp }  from '../../iconNodes'

const props = defineProps<{
  options: {
    text: string
    onClick?: () => void
  }[],
}>()

const selectedOption = ref(props.options[0].text)
const selectionOptionAction = computed(() => props.options.find(option => option.text === selectedOption.value).onClick)
const ChevronUp = createLucideIcon('ChevronUp', chevronUp)
</script>

<template>
  <Listbox v-model="selectedOption">
    <div class="menu">
      <div class="button-wrapper">
        <VPButton
          v-bind="$attrs"
          :text="selectedOption"
          @click="selectionOptionAction"
          theme="alt"
          class="main-button"
        />
        <ListboxButton :as="VPButton" :text="''" theme="alt" class="arrow-up-button"/>
      </div>
      <ListboxOptions class="menu-items">
        <ListboxOption
          as="button"
          class="menu-item"
          v-for="option in options"
          :value="option.text"
        >
          {{ option.text }}
        </ListboxOption>

      </ListboxOptions>
    </div>
  </Listbox>
</template>

<style>
.menu {
  position: relative;
}
.menu-items {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 44px;
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
  transition: background-color 0.5s;
  max-height: calc(100vh - var(--vp-nav-height));
  overflow-y: auto;
}

.menu-item {
  padding: 2px 8px;
  text-align: left;
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition: background-color .25s,color .25s;
}

.menu-item:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-elv-mute);
}

.menu-item:active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-elv);
}

.main-button {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  padding-right: 12px !important;
}

.button-wrapper {
  display: flex;
}

.arrow-up-button {
  display: inline-flex;
  height: 40px;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  padding-left: 4px !important;
  padding-right: 8px !important;
  position: relative;
  left: -1px;
}

.arrow-up-button::before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%0A%3E%3Cpolyline points='18 15 12 9 6 15' /%3E%3C/svg%3E%0A");
  width: 20px;
  height: 28px;
  margin: auto;
  display: block;
}
</style>
