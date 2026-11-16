<script lang="ts">
import { ref } from 'vue'

// This component can be rendered more than once on a page (e.g. a hidden
// copy inside `.content-body`). DocSearch mounts into the first `#docsearch`
// in the document, so only a single instance may ever render the search box.
const loaded = ref(false)
</script>

<script lang="ts" setup>
import '@docsearch/css/dist/style.css'
import {
  computed,
  defineAsyncComponent,
  onMounted,
  onUnmounted,
} from 'vue'
import type { DefaultTheme } from 'vitepress/theme'

import { useData } from 'vitepress'
import FakeInput from '../base/FakeInput.vue'

const VPAlgoliaSearchBox = defineAsyncComponent(() => import('vitepress/dist/client/theme-default/components/VPAlgoliaSearchBox.vue'));

const { theme } = useData<DefaultTheme.Config>()

const algolia = computed(
  () =>
    (theme.value.search?.options ?? theme.value.algolia) as DefaultTheme.AlgoliaSearchOptions,
)

// whether this instance is the one rendering the (hidden) search box
const isOwner = ref(false)
const shortcutText = ref('')

// to avoid loading the docsearch js upfront (which is more than 1/3 of the
// payload), we delay initializing it until the user has actually clicked or
// hit the hotkey to invoke it.
const preconnect = () => {
  const id = 'VPAlgoliaPreconnect'
  if (document.getElementById(id)) return

  const rIC = window.requestIdleCallback || setTimeout
  rIC(() => {
    const preconnect = document.createElement('link')
    preconnect.id = id
    preconnect.rel = 'preconnect'
    preconnect.href = `https://${algolia.value.appId}-dsn.algolia.net`
    preconnect.crossOrigin = ''
    document.head.appendChild(preconnect)
  })
}

onMounted(() => {
  preconnect()

  shortcutText.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘K' : 'Ctrl+K'

  // once docsearch is initialized it handles the hotkey itself
  const handleSearchHotKey = (event: KeyboardEvent) => {
    if (loaded.value) return remove()

    if (
      (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) ||
      (!isEditingContent(event) && event.key === '/')
    ) {
      event.preventDefault()
      open()
      remove()
    }
  }

  const remove = () => {
    window.removeEventListener('keydown', handleSearchHotKey)
  }

  window.addEventListener('keydown', handleSearchHotKey)

  onUnmounted(remove)
})

function open() {
  if (!loaded.value) {
    loaded.value = true
    isOwner.value = true
  }
  setTimeout(poll, 16)
}

function poll() {
  // programmatically open the search box after initialize
  const e = new Event('keydown') as any

  e.key = 'k'
  e.metaKey = true

  window.dispatchEvent(e)

  setTimeout(() => {
    if (!document.querySelector('.DocSearch-Modal')) {
      poll()
    }
  }, 16)
}

function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement
  const tagName = element.tagName

  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  )
}
</script>

<template>
  <div class="VPNavBarSearch">
    <FakeInput
      class="nav-search-input"
      :shortcut="shortcutText"
      aria-label="Search"
      @click="open"
    >
      Search
    </FakeInput>

    <!-- docsearch renders its own button here; we only need its modal -->
    <div v-if="isOwner" class="docsearch-host">
      <VPAlgoliaSearchBox :algolia="algolia" />
    </div>
  </div>
</template>

<style>

@media (min-width: 768px) {
  .VPNavBarSearch {
    flex-grow: 1;
    padding-left: 0px;
  }
}

@media (min-width: 960px) {
  .VPNavBarSearch {
    padding-left: 0px;
  }
}

.VPNavBarSearch {
  padding-top: 24px;
}

.VPNavBarSearch .nav-search-input {
  padding: 8px 12px;
  align-items: center;
  width: 100%;
}

.VPNavBarSearch .docsearch-host {
  display: none;
}

[class*='DocSearch'] {
  --docsearch-primary-color: var(--vp-c-brand-1);
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-text-color: var(--vp-c-text-1);
  --docsearch-muted-color: var(--vp-c-text-2);
  --docsearch-searchbox-shadow: none;
  --docsearch-searchbox-background: transparent;
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-key-gradient: transparent;
  --docsearch-key-shadow: none;
  --docsearch-modal-background: var(--vp-c-bg-soft);
  --docsearch-footer-background: var(--vp-c-bg);
}

.dark [class*='DocSearch'] {
  --docsearch-modal-shadow: none;
  --docsearch-footer-shadow: none;
  --docsearch-logo-color: var(--vp-c-text-2);
  --docsearch-hit-background: var(--vp-c-gray-3);;
  --docsearch-container-background: rgba(0, 0, 0, 0.4);
  --docsearch-hit-color: var(--vp-c-text-2);
  --docsearch-hit-shadow: none;
}

.dark .DocSearch-Footer {
  border-top: 1px solid var(--vp-c-divider);
}

.DocSearch-Form {
  border: 1px solid var(--vp-c-brand-1);
  background-color: var(--vp-c-white);
}

.dark .DocSearch-Form {
  background-color: var(--vp-c-default-soft);
}

.DocSearch-Screen-Icon > svg {
  margin: auto;
}
</style>
