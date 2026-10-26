<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import Icon from '@lucide/vue/src/Icon';
import { chevronsUpDown, check } from '../../../data/iconNodes';
import SelectIcon from './SelectIcon.vue';

defineProps<{
  id?: string;
  items?: { name: string; value: string; icon?: string; iconDark?: string }[];
}>();

const selected = defineModel<{ name: string; value: string; icon?: string; iconDark?: string }>();
</script>

<template>
  <Listbox v-model="selected">
    <div class="select-wrapper">
      <ListboxButton
        class="select-button"
        :id="id"
      >
        <slot name="start-icon">
          <SelectIcon  v-if="selected.icon" :item="selected" />
        </slot>
        <span class="select-text">{{ selected.name }}</span>
        <span class="select-icon">
          <slot name="end-icon">
            <Icon
              :iconNode="chevronsUpDown"
              name="chevrons-up-down"
              class="chevron-icon"
              aria-hidden="true"
            />
          </slot>
        </span>
      </ListboxButton>

      <transition
        enter-active-class="transition-enter"
        enter-from-class="transition-enter-from"
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
              <SelectIcon v-if="item.icon" :item="item" />
              <span :class="['option-text', { selected }]">{{ item.name }}</span>
              <span
                v-if="selected"
                class="check-icon"
              >
                <Icon
                  :iconNode="check"
                  name="check"
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

/* The button shows a brand border on hover and the chevrons take the text colour */
.select-button {
  cursor: pointer;
  transition-duration: 0.25s !important;
}

.select-button:hover {
  border-color: var(--vp-c-brand);
}

.select-button:hover .chevron-icon,
.select-button[aria-expanded='true'] .chevron-icon {
  color: var(--vp-c-text-1);
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

.chevron-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: #9ca3af;
  transition: color 0.25s;
  transition-duration: 0.25s !important;
}

/* The list fades in and slides down a little from the button */
.transition-enter {
  transition:
    opacity 150ms ease-out,
    transform 200ms cubic-bezier(0.34, 1.4, 0.64, 1);
  transition-duration: 150ms, 200ms !important;
}

.transition-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.transition-leave {
  transition: opacity 100ms ease-in;
  transition-duration: 100ms !important;
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
  transition-duration: 0.25s !important;
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
