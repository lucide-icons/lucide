<script setup lang="ts">
import {IconEntity} from "../../types";

const props = defineProps<{
  icon: IconEntity
}>()

</script>

<template>
  <div class="contributors" v-if="props.icon.contributors?.length>0">
    <h2 class="label">Contributors</h2>
    <div class="avatar-group">
      <a class="avatar" v-for="contributor in props.icon.contributors" :href="`https://github.com/${contributor}`" target="_blank" :data-name="contributor">
        <img class="avatar-image" :alt="contributor" :src="`https://github.com/${contributor}.png?size=128`" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.contributors {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
}
h2.label {
  font-size: 20px;
  border: 0;
  padding: 0;
  margin: 0;
}
.avatar-group {
  display: flex;
}
.avatar:not(:first-child) {
  margin-left: -24px;
}
.avatar:before {
  content: attr(data-name);
  display: block;
  font-size: 12px;
  line-height: 20px;
  margin-left: 27px;
  transform: translate(-50%, -28px) scale(0.9);
  font-weight: 400;
  position: absolute;
  background: var(--vp-c-brand-dark);
  color: white;
  z-index: 10;
  padding: 2px 8px;
  border-radius: 4px;
  box-shadow: var(--vp-shadow-1);
  opacity: 0;
  pointer-events: none;
  transition: cubic-bezier(0.19, 1, 0.22, 1) .2s;
  transition-property: opacity, transform;
  /* max-width: calc((32px * 2) + 56px); */
  overflow: hidden;
  white-space: nowrap;
  word-break: break-word;
}
.avatar:hover:before {
  opacity: 1;
  transform: translate(-50%, -28px) scale(1);
}
.avatar-image {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-bg-elv);
}
.avatar:hover .avatar-image {
  border: 3px solid var(--vp-c-bg-soft-mute);
}
</style>
