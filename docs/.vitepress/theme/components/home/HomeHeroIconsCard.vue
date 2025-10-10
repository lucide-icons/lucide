<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount, watchEffect} from 'vue';
import { data } from './HomeHeroIconsCard.data'
import LucideIcon from '../base/LucideIcon.vue'
import { useRouter } from 'vitepress';
import { random } from 'lodash-es'
import FakeInput from '../base/FakeInput.vue'

const { go } = useRouter()
const intervalTime = shallowRef()

const ITEM_COUNT = 8;

const getInitialItems = () => data.icons.slice(0, 20)
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
  const newIcon = getRandomNewIcon()

  items.value = [
    ...items.value,
    newIcon
  ]

  console.log('inserted', items.value.length);
}


const CENTER = 360;

const paths = ref(
  Array.from({ length: ITEM_COUNT }).map((_, i) => {
    {
      const angleOffset = (i / ITEM_COUNT) * Math.PI * 2;
      const cx = CENTER, cy = CENTER;
      const turns = 0.5;
      const steps = 600;
      const a = 120;

      const d = Array.from({ length: steps }, (_, s) => {
        const t = angleOffset + (s / (steps - 1)) * (turns * Math.PI * 2);
        const r = a * (t - angleOffset);
        const x = cx + r * Math.sin(t);
        const y = cy + r * Math.cos(t);
        return `${s ? 'L' : 'M'}${x},${y}`;
      }).join(' ');

      return d;
    }
  })
)


function startInterval() {
  intervalTime.value = setInterval(() => {
    insert()
  }, 2000)
}

watchEffect(() => {
  console.log(items.value);

})

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
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 720 720" class="spiral" aria-hidden="true">
      <defs>
        <radialGradient id="grad">
          <stop stop-color="#65F5F5" stop-opacity="0" offset="22%"></stop>
          <stop stop-color="#65F5F5" stop-opacity="0.3" offset="85%"></stop>
          <stop stop-color="#65F5F5" stop-opacity="0" offset="100%"></stop>
        </radialGradient>
        <filter id="iconShadow" width="120" height="120">
          <feDropShadow
            dx="-0.8"
            dy="-0.8"
            stdDeviation="0"
            flood-color="pink"
            flood-opacity="0.5"
          />
        </filter>
        <filter id="logoShadow" width="400" height="400" y="-100" x="-100">
          <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="40"
          flood-color="#F5656599"
          flood-opacity="0.8" />
        </filter>
      </defs>
      <!-- <rect width="720" height="720" fill="url(#grad)"/> -->
       <!-- <path d="M0 0h320v720H0z" fill="none" stroke="url(#grad)"/> -->
      <mask id="mask1">
        <path
          v-for="(path, index) in paths"
          :key="path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="white"
          :d="path"
        />
      </mask>

      <g mask="url(#mask1)">
        <rect width="720" height="720" fill="url(#grad)"/>
      </g>

      <g v-for="(path, index) in paths" :key="index">
        <animateMotion
          :path="path"
          :begin="`${(((index) + 1) % ITEM_COUNT) }s;this.DOMActivate`"
          dur="20s"
          calcMode="spline" keySplines="0.8 0.7 0.1 0.1"
          keyPoints="1;0"
          keyTimes="0;1"
          from="10"

        />
        <animate attributeName="opacity"
             values="0;0;0;1" dur="3s"
              :begin="`${(((index) + 1) % ITEM_COUNT) }s;this.DOMActivate`"
        />
        <animate attributeName="opacity"
             values="0;1" dur="3s"
             start-offset="17s"
              :begin="`${(((index) + 1) % ITEM_COUNT) }s;this.DOMActivate`"
        />
        <LucideIcon
          y="-16"
          x="-16"
          size="32"
          v-if="items[index]"
          v-bind="items[index]"
          filter="url(#f3)"
        />
      </g>
      <g filter="url(#logoShadow)">
        <svg
          width="200"
          height="200"
          x="260"
          y="260"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"

        >
          <path d="M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557" stroke="currentColor" />
          <path d="M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21" stroke="#F56565" />
        </svg>
      </g>

    </svg>
  </div>

</template>

<style scoped>
.spiral {
  width: 800px;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -180px;
  left: -140px;

}
.card-wrapper {
  margin-left: auto;
  margin-bottom: auto;
  position: relative;
  top:-60px;

  /* margin-top: 48px; */
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
