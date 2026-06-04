<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { ref, watch, onMounted } from 'vue'
import { useAside } from 'vitepress/dist/client/theme-default/composables/aside.js'
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js'

const { page } = useData()
const props = defineProps<{
  carbonAds: DefaultTheme.CarbonAdsOptions
  overlay?: boolean
}>()

const carbonOptions = props.carbonAds

const { isAsideEnabled } = useAside()
const container = ref()

let isInitialized = false

function init() {
  if (!isInitialized) {
    isInitialized = true
    const params = new URLSearchParams({
      serve: carbonOptions.code,
      placement: carbonOptions.placement,
      format: 'responsive',
    })
    const s = document.createElement('script')
    s.id = '_carbonads_js'
    s.src = `//cdn.carbonads.com/carbon.js?${params.toString()}`
    s.async = true
    container.value.appendChild(s)
  }
}

watch(() => page.value.relativePath, () => {
  if (isInitialized && isAsideEnabled.value) {
    ;(window as any)._carbonads?.refresh()
  }
})

// no need to account for option changes during dev, we can just
// refresh the page
if (carbonOptions) {
  onMounted(() => {
    // if the page is loaded when aside is active, load carbon directly.
    // otherwise, only load it if the page resizes to wide enough. this avoids
    // loading carbon at all on mobile where it's never shown
    if (isAsideEnabled.value || props.overlay) {
      init()
    } else {
      watch(isAsideEnabled, (wide) => wide && init())
    }
  })
}
</script>

<template>
  <div class="VPCarbonAds" ref="container" />
</template>

<style scoped>
.VPCarbonAds {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  min-height: 256px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;
  background-color: var(--vp-carbon-ads-bg-color);
}

.VPCarbonAds :deep(img) {
  margin: 0 auto;
  border-radius: 6px;
}

.VPCarbonAds :deep(.carbon-text) {
  display: block;
  margin: 0 auto;
  padding-top: 12px;
  color: var(--vp-carbon-ads-text-color);
  transition: color 0.25s;
}

.VPCarbonAds :deep(.carbon-text:hover) {
  color: var(--vp-carbon-ads-hover-text-color);
}
.VPCarbonAds :deep(#carbon-responsive .carbon-poweredby),
.VPCarbonAds :deep(.carbon-poweredby) {
  display: block;
  padding-bottom: 2px;
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-carbon-ads-poweredby-color);
  text-transform: uppercase;
  transition: color 0.25s;
}
.VPCarbonAds :deep(#carbon-responsive) {
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
}

.VPCarbonAds :deep(#carbon-responsive .carbon-poweredby) {
  text-align: left;
}

.VPCarbonAds :deep(#carbon-responsive .carbon-poweredby:hover),
.VPCarbonAds :deep(.carbon-poweredby:hover) {
  color: var(--vp-carbon-ads-hover-poweredby-color);
}

.VPCarbonAds :deep(> div) {
  display: none;
}

.VPCarbonAds :deep(> div:first-of-type) {
  display: block;
}

.VPCarbonAds :deep(#carbon-responsive) {
  flex-direction: column-reverse;
}

.VPCarbonAds :deep(#carbon-responsive .carbon-responsive-wrap) {
  border-radius: 10px;
}
</style>
