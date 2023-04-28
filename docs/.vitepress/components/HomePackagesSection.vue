<script setup lang="ts">
import HomeContainer from './HomeContainer.vue'
import { useRouter } from 'vitepress';
import { data } from './HomePackagesSection.data'

const { go } = useRouter()
</script>

<template>
  <HomeContainer>
    <h2 class="section-title">Available For:</h2>
    <div class="packages-list">
      <a
        v-for="{ name, logo } in data.packages"
        :href="`/guide/packages/${name}`"
        class="mr-4"
        :aria-label="`Read more about: ${name} package`"
        @click.prevent="go(`/guide/packages/${name}`)"
      >
        <img
          :src="logo"
          height="36"
          width="36"
          loading="lazy"
        />
      </a>
    </div>
  </HomeContainer>
</template>

<style scoped>
.section-title {
  color: var(--vp-c-text-2);
  font-weight: 500;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
}
.packages-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 -0.5rem;
  gap: 16px;
}
</style>
