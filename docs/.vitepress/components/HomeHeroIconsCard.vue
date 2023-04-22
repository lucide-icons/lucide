<script setup lang="ts">
import { data } from './HomeHeroIconsCard.data'
import IconButton from './IconButton.vue';
import LucideIcon from './LucideIcon.vue'
import { useRouter } from 'vitepress';

const { go } = useRouter()

</script>

<template>
  <div class="card-wrapper">


    <div class="icons-card">
      <div class="card-grid">
        <TransitionGroup  name="list">
          <IconButton v-for="icon in data.icons" @click="go(`/icons/${props.name}`)">
            <LucideIcon
              v-bind="icon"
            />
          </IconButton>

        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  /* padding: 0 24px; */
  margin-left: auto;
}
.icons-card {
  background: var(--vp-input-bg-color);
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  height:100%;
  box-shadow: var(--vp-shadow-4);
  max-height: 220px;
  max-width: 560px;
  margin: 0 auto;
  /* max-height: 240px; */
  /* margin-top: 96px; */
}

.card-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(38px, 1fr));
  width: 100%;
  height:100%;
  max-height: 172px;
  max-width: 512px;
  overflow: hidden;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
