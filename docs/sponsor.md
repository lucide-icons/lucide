---
title: Sponsor
description: Sponsor Lucide to fund icon reviews, new packages and dependable releases. Pick a tier on Open Collective or GitHub Sponsors.
layout: page
faq:
  - question: Will Lucide stay free?
    answer: Yes. Every icon stays free and open source under the ISC license, whether or not you sponsor.
  - question: Open Collective or GitHub Sponsors?
    answer: Both have the same tiers. Open Collective takes card, bank transfer and PayPal in EUR with a public ledger. GitHub Sponsors bills in USD through your existing GitHub account, with invoicing for organizations.
  - question: Can I pay yearly?
    answer: Gold and Platinum can be paid yearly at ten times the monthly price, so you get two months free and one invoice.
  - question: When does my logo appear?
    answer: Logos come from your Open Collective or GitHub profile. lucide.dev updates within a day. The npm READMEs use a hosted image, so they update without a new release.
  - question: Does sponsoring get my icons accepted?
    answer: No. Partners get their icon PRs reviewed first, but every icon meets the same design guidelines and community review.
  - question: Can I cancel anytime?
    answer: Yes, recurring contributions can be cancelled anytime on Open Collective or GitHub Sponsors.
---

<script setup>
import Faq from '~/.vitepress/theme/components/base/Faq.vue'
import SponsorSection from '~/.vitepress/theme/components/sponsor/SponsorSection.vue'
import SponsorHero from '~/.vitepress/theme/components/sponsor/SponsorHero.vue'
import SponsorAmountPicker from '~/.vitepress/theme/components/sponsor/SponsorAmountPicker.vue'
import SponsorTiers from '~/.vitepress/theme/components/sponsor/SponsorTiers.vue'
import SponsorWall from '~/.vitepress/theme/components/sponsor/SponsorWall.vue'
import SponsorFundingUses from '~/.vitepress/theme/components/sponsor/SponsorFundingUses.vue'
import SponsorCta from '~/.vitepress/theme/components/sponsor/SponsorCta.vue'
</script>

<SponsorHero />
<SponsorAmountPicker />
<SponsorTiers />
<SponsorWall />
<SponsorFundingUses />
<SponsorSection narrow class="faq-section">
  <Faq title="Frequently asked questions" />
</SponsorSection>
<SponsorCta />

<style scoped>
.faq-section {
  padding-block: 96px;
}
</style>
