<script setup lang="ts">
import {IconEntity} from "../../types";
import Label from "../base/Label.vue";

const props = defineProps<{
  icon: IconEntity
}>()

</script>

<template>
  <div class="contributors" v-if="props.icon.contributors?.length>0">
    <Label>Contributors:</Label>
    <div class="avatar-group">
      <a class="avatar"
        v-for="contributor in props.icon.contributors"
        :key="contributor"
        :href="`https://github.com/${contributor}`"
        target="_blank"
        :data-name="contributor"
        rel="noreferrer noopener"
      >
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
  /* justify-content: flex-end; */
  gap: 16px;
}
.avatar-group {
  display: flex;
}
.avatar:not(:first-child) {
  margin-left: -24px;
}
.avatar {
  position: relative;
}
.avatar:before {
  content: attr(data-name);
  display: block;
  font-size: 12px;
  line-height: 20px;
  transform: translateX(-50%) scale(0.9);
  font-weight: 400;
  position: absolute;
  top: -28px;
  left: 50%;
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
  overflow: hidden;
  white-space: nowrap;
  word-break: break-word;
}
.avatar:hover:before {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
.avatar-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-bg-elv);
  background-color: var(--vp-c-neutral);
}
.avatar:hover .avatar-image {
  border: 2px solid var(--vp-c-bg-soft-mute);
}

.avatar:hover {
  z-index: 2;
}
</style>
