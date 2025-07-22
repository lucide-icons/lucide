---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
markdownStyles: false

head:
  - - link
    - rel: canonical
      content: https://lucide.dev/

hero:
  name: |
    Beautiful &
    consistent icons
  tagline: Made by the community.
  image:
    src: /favicon.svg
    alt: VueUse
  actions:
    - theme: brand
      text: View all icons
      link: icons/
    - theme: alt
      text: Get Started
      link: guide/
    - theme: alt
      text: GitHub
      link: https://github.com/lucide-icons/lucide

features:
  - title: Lightweight & Scalable
    details: Icons are lightweight, highly optimized scalable vector graphics (SVG).
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-expand"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path><path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path><path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path></svg>
  - title: Clean & consistent
    details: Designed with a strict set of design rules for consistency in style and readability.
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-aperture"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" x2="20.05" y1="8" y2="17.94"></line><line x1="9.69" x2="21.17" y1="8" y2="8"></line><line x1="7.38" x2="13.12" y1="12" y2="2.06"></line><line x1="9.69" x2="3.95" y1="16" y2="6.06"></line><line x1="14.31" x2="2.83" y1="16" y2="16"></line><line x1="16.62" x2="10.88" y1="12" y2="21.94"></line></svg>
  - title: Customizable
    details: Customize the color, size, stroke width, and more.
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
  - title: Packages support
    details: Lucide is available as a package for all major package managers.
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-check"><path d="m16 16 2 2 4-4"></path><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="M16.5 9.4 7.55 4.24"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" x2="12" y1="22" y2="12"></line></svg>
  - title: Tree shakable
    details: The icons are tree shakable, so you only import the icons you use.
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tree-deciduous"><path d="M8 19h8a4 4 0 0 0 3.8-2.8 4 4 0 0 0-1.6-4.5c1-1.1 1-2.7.4-4-.7-1.2-2.2-2-3.6-1.7a3 3 0 0 0-3-3 3 3 0 0 0-3 3c-1.4-.2-2.9.5-3.6 1.7-.7 1.3-.5 2.9.4 4a4 4 0 0 0-1.6 4.5A4 4 0 0 0 8 19Z"></path><path d="M12 19v3"></path></svg>
  - title: Active community
    details: Lucide has active community on GitHub and Discord.
    icon: |
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F56565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
---

<script setup>
import HomePackagesSection from './.vitepress/theme/components/home/HomePackagesSection.vue'
import HomeIconCustomizer from './.vitepress/theme/components/home/HomeIconCustomizer.vue'
import HomeTeamSection from './.vitepress/theme/components/home/HomeTeamSection.vue'
</script>

<HomePackagesSection />
<HomeIconCustomizer />
<HomeTeamSection />
