<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()
</script>

<template>
  <div class="input-field">
    <div class="input-label" v-if="label">
      <label :for="id" class="customize-label">
        {{ label }}
      </label>
      <div class="display-value" >
        <slot name="display"/>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.customize-label {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color .5s;
  display: block;
}

.input-field:not(:last-child) {
  margin-bottom: 16px;
}

.display-value {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
}
</style>
