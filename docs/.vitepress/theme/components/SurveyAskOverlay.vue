<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core';
import IconButton from './base/IconButton.vue';
import { x } from '../../data/iconNodes';
import Icon from '@lucide/vue/src/Icon';
import { computed, onMounted, ref } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';

const showAskSurvey = useSessionStorage('show-ask-overlay', true, {
  initOnMounted: true,
});

const delayedShow = ref(false)

const showPopup = computed(() => showAskSurvey.value && delayedShow.value );
let isInitialized = false

function startTally() {
  window.Tally.openPopup('EkvOpB', {
    layout: 'modal',
    width: 700,
    autoClose: 5000,
    onClose() {
      showAskSurvey.value = false;
    },
    onSubmit() {
      showAskSurvey.value = false;
    },
  });
}

onMounted(() => {
  setTimeout(() => {
    delayedShow.value = true
  }, 10000)
})

function initTally() {
  try {
    if (!isInitialized) {
      isInitialized = true
      const s = document.createElement('script')
      s.src = `//tally.so/widgets/embed.js`
      s.async = true
      s.onload = startTally
      document.body.appendChild(s)
    } else {
      startTally();
    }
  } catch (error) {
    window.open('https://tally.so/r/EkvOpB', '_blank');
  }
}

function hidePopup() {
  showAskSurvey.value = false;
}
</script>

<template>
  <Teleport to="body">
    <div
      :class="{
        'show-popup': showPopup,
      }"
      class="ask-overlay"
    >
      <IconButton
        @click="hidePopup"
        class="hide-button"
      >
        <Icon
          :iconNode="x"
          :size="20"
          absoluteStrokeWidth
        />
      </IconButton>

      <h2 class="title">
        We value your feedback!
      </h2>

      <p class="description">
        Can you spare a moment to take our survey? <br>Your feedback helps us improve Lucide and make it better for everyone.
      </p>

      <div class="buttons">
        <VPButton
          text="Take the Survey"
          theme="brand"
          @click="initTally"
        />

        <VPButton
          text="Close"
          theme="alt"
          @click="hidePopup"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.ask-overlay {
  position: fixed;
  z-index: 99;;
  bottom: 24px;
  width: calc(100% - 48px);
  max-width: 420px;
  left: 24px;
  transition:
    opacity 0.25s,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--vp-shadow-4);
  background-color: var(--vp-carbon-ads-bg-color);
  opacity: 0;
  transform: translateY(200px);
}

.ask-overlay .title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.ask-overlay .description {
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.ask-overlay.show-popup {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.ask-overlay .buttons {
  margin-top: 16px;
  display: flex;
  gap: 16px;
}

.ask-overlay.show-popup {
  transition:
    opacity 0.5s,
    transform 0.25s ease;
}

.hide-button {
  padding: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  background-color: transparent;
}
</style>
