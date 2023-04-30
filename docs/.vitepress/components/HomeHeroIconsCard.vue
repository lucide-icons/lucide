<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount} from 'vue';
import { data } from './HomeHeroIconsCard.data'
import IconButton from './IconButton.vue';
import LucideIcon from './LucideIcon.vue'
import { useRouter } from 'vitepress';
import { random } from 'lodash-es'
import FakeInput from './FakeInput.vue'

const { go } = useRouter()
const intervalTime = shallowRef()

const getInitialItems = () => data.icons.slice(0, 48)
const items = ref(getInitialItems())
let id = items.value.length + 1

function getRandomNewIcon() {
  const randomIndex = random(0, 200)
  const newRandomIcon = data.icons[randomIndex]

  if (items.value.some((item) => item.name === newRandomIcon.name)) {
    return getRandomNewIcon()
  }

  return newRandomIcon
}

function insert() {
  const replaceIndex = random(0, 48)
  const newIcon = getRandomNewIcon()

  items.value[replaceIndex] = newIcon
}

// TODO: Try maybe something else for better pref performance
// onMounted(() => {
//   intervalTime.value = setInterval(() => {
//     insert()
//   }, 2000)
// })

onBeforeUnmount(() => {
  clearInterval(intervalTime.value)
})

</script>

<template>
  <div class="card-wrapper">
    <div class="icons-card">
      <div class="card-grid">
        <TransitionGroup  name="list" mode="out-in">
          <IconButton
            v-for="icon in items"
            @click="() => go(`/icons/${icon.name}`)"
            :aria-label="`See ${icon.name} icon`"
            :key="icon.name"
            class="random-icon"
          >
            <LucideIcon
              v-bind="icon"
            />
          </IconButton>
        </TransitionGroup>
      </div>
      <FakeInput @click="go('/icons/?focus')" class="search-box">
        Search 964 icons...
      </FakeInput>
    </div>
  </div>

</template>

<style scoped>
.card-wrapper {
  /* padding: 0 24px; */
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 48px;;
}
.icons-card {
  background: var(--vp-c-bg-alt);
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  height:100%;
  box-shadow: var(--vp-shadow-2);
  max-height: 220px;
  max-width: 560px;
  margin: 0 auto;
  position: relative;
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
  position: relative;
}

/* 1. declare transition */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(.85,.85,.25,1.1);
}

/* 2. declare enter from and leave to state */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.01);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  opacity: 0;
  display: none;
}

.search-box {
  position: absolute;
  width: 100%;
  left: 0;
  top: -48px;
}

@media (min-width: 960px) {
  .search-box {
    top: unset;
    bottom: -24px;
    left: -24px;
  }
  .card-wrapper {
    margin-top: 0;
  }
}

/* .search-box :deep(.input) {
  background: var(--vp-code-block-bg-light);
  color: var(--vp-code-block-color);
  padding: 12px 16px;
  height: auto;
  font-size: 16px;
  box-shadow: var(--vp-shadow-4);
}

.search-box :deep(.input)::placeholder {
  color: var(--vp-c-text-inverse-2)
} */

</style>
