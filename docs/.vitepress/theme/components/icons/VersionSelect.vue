<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue';

import { chevronsUpDown, check } from '../../../data/iconNodes';
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';

const model = defineModel<string | undefined>();
const props = defineProps<{
  versions: string[];
}>();

let query = ref('');

let filteredVersions = computed(() =>
  query.value === ''
    ? [...props.versions]
    : props.versions.filter((version) =>
        version
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      ),
);

const emit = defineEmits(['focus']);

const ChevronUpDown = createLucideIcon('ChevronUpDown', chevronsUpDown);
const Check = createLucideIcon('Check', check);
</script>

<template>
  <Combobox v-model="model">
    <div class="combobox-container">
      <div class="combobox-input-container">
        <ComboboxInput
          class="combobox-input"
          placeholder="Latest version"
          @change="query = $event.target.value"
          @focus="emit('focus')"
        />
        <ComboboxButton class="combobox-button">
          <ChevronUpDown
            class="icon-chevron"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>

      <ComboboxOptions class="combobox-options">
        <div
          v-if="versions.length === 0 && query !== ''"
          class="combobox-no-results"
        >
          No match!
        </div>

        <ComboboxOption
          v-for="version in filteredVersions"
          as="template"
          :key="version"
          :value="version"
          v-slot="{ selected, active }"
        >
          <li
            class="combobox-option"
            :class="{ active: active }"
          >
            <span
              class="combobox-option-text"
              :class="{ selected: selected }"
            >
              {{ version }}
            </span>
            <span
              v-if="selected"
              class="combobox-option-icon"
              :class="{ active: active }"
            >
              <Check
                class="icon-check"
                aria-hidden="true"
              />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<style scoped>
.combobox-input-container {
  position: relative;
  width: 100%;
  height: 48px;
  min-width: 160px;
  cursor: default;
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
  text-align: left;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
}

.combobox-input {
  width: 100%;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-1);
  border: 1px solid transparent;
  transition: border-color 0.15s ease-in-out;
}

.combobox-input:hover,
.combobox-input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.combobox-button {
  position: absolute;
  top: 4px;
  padding: 9px 8px;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  z-index: 10;
}

.icon-chevron {
  height: 20px;
  width: 20px;
  color: #9ca3af;
}

.combobox-options {
  position: absolute;
  margin-top: 0.25rem;
  width: 100%;
  max-width: 160px;
  padding: 12px;
  min-width: 128px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transition: background-color 0.5s;
  max-height: 240px;
  outline: none;
  right: 0;
}

.combobox-no-results {
  position: relative;
  cursor: default;
  padding: 0.5rem 1rem;
  color: #4b5563;
}

.combobox-option {
  position: relative;
  cursor: default;
  padding: 2px 8px;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.combobox-option.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-default-soft);
}

.combobox-option-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.combobox-option-text.selected {
  font-weight: 500;
}

.combobox-option-icon {
  position: absolute;
  right: 8px;
  top: 8px;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  color: var(--vp-c-brand) !important;
}

.combobox-option-icon.active {
  color: var(--vp-c-brand) !important;
}

.icon-check {
  height: 20px;
  width: 20px;
}
</style>
