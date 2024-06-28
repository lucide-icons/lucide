<script setup lang="ts">
import HomeContainer from './HomeContainer.vue'
import HomeSectionTitle from './HomeSectionTitle.vue'
import { useRouter } from 'vitepress';
import { data } from './HomePackagesSection.data'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';

const { go } = useRouter()
</script>

<template>
  <HomeContainer>
    <HomeSectionTitle>Available For:</HomeSectionTitle>
    <div class="packages-list">
      <a
        v-for="{ name, logo } in data.packages"
        :href="`/guide/packages/${name}`"
        class="package-logo"
        :aria-label="`Read more about: ${name} package`"
        @click.prevent="go(`/guide/packages/${name}`)"
      >
        <img
          :src="logo"
          height="36"
          width="36"
          loading="lazy"
          :alt="`${name} logo`"
        />
      </a>
    </div>
    <div class="more-button-wrapper">
      <VPButton text="And more" href="/packages" theme="alt" class="more-button"/>
    </div>
  </HomeContainer>
</template>

<style scoped>
.packages-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 -0.5rem;
  gap: 16px;
}

.more-button-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.package-logo {
  transition: opacity ease-in .15s;
}

.package-logo:hover {
  opacity: .6;
}
</style>
