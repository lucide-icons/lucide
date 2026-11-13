<script setup lang="ts">
import Icon from '@lucide/vue/src/Icon';
import { gitPullRequest, server, shapes, users } from '../../../data/iconNodes';
import SponsorSection from './SponsorSection.vue';
import SponsorSectionHeader from './SponsorSectionHeader.vue';

const uses = [
  {
    title: 'Maintenance and reviews',
    description: 'Reviewing icon PRs, fixing issues and shipping releases across every package.',
    icon: gitPullRequest,
    name: 'git-pull-request',
  },
  {
    title: 'New icons and packages',
    description: 'Designing icons the community asks for and supporting new frameworks.',
    icon: shapes,
    name: 'shapes',
  },
  {
    title: 'Contributors',
    description: 'Supporting the people who design, review and document Lucide.',
    icon: users,
    name: 'users',
  },
  {
    title: 'Infrastructure',
    description: 'Hosting lucide.dev, search, CI and the tools the team relies on.',
    icon: server,
    name: 'server',
  },
];
</script>

<template>
  <SponsorSection band>
    <SponsorSectionHeader
      title="Where your money goes"
      description="Lucide holds its funds on Open Collective, so every expense is public."
    />
    <div class="uses">
      <div
        v-for="use in uses"
        :key="use.title"
        class="use"
      >
        <div class="icon-tile">
          <Icon
            :iconNode="use.icon"
            :name="use.name"
            :size="22"
            aria-hidden="true"
          />
        </div>
        <h3 class="use-title">{{ use.title }}</h3>
        <p class="use-description">{{ use.description }}</p>
      </div>
    </div>
  </SponsorSection>
</template>

<style scoped>
.uses {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.use {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.icon-tile {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
  color: var(--sponsor-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.use-title {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.use-description {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
