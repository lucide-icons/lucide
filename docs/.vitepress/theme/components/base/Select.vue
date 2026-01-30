<script setup lang="ts">
import { ref } from 'vue';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import Icon from '@lucide/vue/src/Icon';
import { chevronsUpDown, check } from '../../../data/iconNodes';

defineProps<{
  id?: string;
  items?: { name: string; icon: string }[];
}>();

const selected = defineModel<{ name: string; icon: string }>();
</script>

<template>
  <Listbox v-model="selected">
    <div class="select-wrapper">
      <ListboxButton
        class="select-button"
        :id="id"
      >
        <img
          :src="selected.icon"
          :class="{ 'select-item-icon': true }"
          :alt="`${selected.name} logo`"
          loading="lazy"
        />
        <span class="select-text">{{ selected.name }}</span>
        <span class="select-icon">
          <Icon
            :iconNode="chevronsUpDown"
            class="chevron-icon"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition-leave"
        leave-from-class="transition-leave-from"
        leave-to-class="transition-leave-to"
      >
        <ListboxOptions class="select-options">
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item.name"
            :value="item"
            as="template"
          >
            <li :class="['select-option', { active, selected }]">
              <img
                :src="item.icon"
                :class="{ 'select-item-icon': true }"
                :alt="`${item.name} logo`"
                loading="lazy"
              />
              <span :class="['option-text', { selected }]">{{ item.name }}</span>
              <span
                v-if="selected"
                class="check-icon"
              >
                <Icon
                  :iconNode="check"
                  class="check"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style scoped>
.select-wrapper {
  position: relative;
}

.select-button {
  background: var(--vp-sidebar-input);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  padding: 7px 14px;
  height: auto;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: text;
  display: flex;
  gap: 12px;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
  width: 100%;
  align-items: center;
}

.select-button:focus {
  border-color: var(--vp-c-brand);
}

.select-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-icon {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
}

.select-item-icon {
  object-fit: contain;
  width: 24px;
  height: 24px;
}

.chevron-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: #9ca3af;
}

.transition-leave {
  transition: opacity 100ms ease-in;
}

.transition-leave-from {
  opacity: 1;
}

.transition-leave-to {
  opacity: 0;
}

.select-options {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transition: background-color 0.5s;
  max-height: calc(100vh - var(--vp-nav-height));
  overflow-y: auto;
  width: 100%;
  z-index: 90;
  right: 0;
  top: 44px;
}

.select-option {
  position: relative;
  cursor: default;
  user-select: none;
  padding: 0px 4px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
  list-style: none;
}

.select-option:hover,
.select-option.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-default-soft);
}

.select-option:active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-elv);
}

.option-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
}

.option-text.selected {
  font-weight: 500;
}

.check-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  color: var(--vp-c-brand);
}

.check {
  height: 1.25rem;
  width: 1.25rem;
}

@media (min-width: 640px) {
  .select-button,
  .select-options {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
