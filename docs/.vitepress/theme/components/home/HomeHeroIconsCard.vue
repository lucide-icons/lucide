<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount} from 'vue';
import { data } from './HomeHeroIconsCard.data'
import LucideIcon from '../base/LucideIcon.vue'
import { useRouter } from 'vitepress';
import { random } from 'lodash-es'
import FakeInput from '../base/FakeInput.vue'

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

function startInterval() {
  intervalTime.value = setInterval(() => {
    insert()
  }, 2000)
}

// TODO: Try maybe something else for better pref performance
onMounted(() => {
  window.addEventListener('mousemove', startInterval, { once: true })
})

onBeforeUnmount(() => {
  clearInterval(intervalTime.value)
})

</script>

<template>
  <div class="card-wrapper">
    <div class="icons-card">
      <div class="card-grid">
        <TransitionGroup  name="list" mode="out-in">
          <div
            v-for="icon in items"
            :key="icon.name"
            class="random-icon"
          >
            <LucideIcon
              v-bind="icon"
            />
          </div>
        </TransitionGroup>
      </div>
      <FakeInput @click="go('/icons/?focus')" class="search-box">
        Search {{ data.iconsCount }} icons...
      </FakeInput>
    </div>
  </div>

</template>

<style scoped>
.card-wrapper {
  margin-left: auto;
  margin-bottom: auto;
  margin-top: 48px;
}
.icons-card {
  background: var(--vp-c-bg-alt);
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  height:100%;
  max-height: 220px;
  max-width: 560px;
  margin: 0 auto;
  position: relative;
}

.card-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(36px, 1fr));
  width: 100%;
  height:100%;
  max-height: 168px;
  max-width: 512px;
  overflow: hidden;
  position: relative;
}

.list-enter-active {
  transition: all 0.5s cubic-bezier(.85,.85,.25,1.1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.01);
}

.list-leave-active {
  position: absolute;
  opacity: 0;
  display: none;
}

.search-box {
  position: absolute;
  width: 100%;
  left: 0;
  top: -64px;
}

.random-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 960px) {
  .search-box {
    top: unset;
    bottom: -24px;
    left: -24px;

    box-shadow: var(--vp-shadow-3);
    background: var(--vp-c-bg);
  }

  .dark .search-box {
    background: var(--vp-c-bg-soft);
  }
  .card-wrapper {
    margin-top: 8px;
  }
}

</style>
