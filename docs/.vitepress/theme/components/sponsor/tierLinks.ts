import type { TierId } from './tiers';

/**
 * Direct checkout links for each sponsor tier. Leave a link empty to fall back to the
 * general Open Collective or GitHub Sponsors page.
 *
 * - Open Collective: open the tier on opencollective.com/lucide-icons and copy its
 *   "Contribute" link, e.g. https://opencollective.com/lucide-icons/contribute/backer-12345/checkout
 * - GitHub Sponsors: open the tier on github.com/sponsors/lucide-icons and copy its link,
 *   e.g. https://github.com/sponsors/lucide-icons/sponsorships?tier_id=12345
 */
export const TIER_LINKS: Record<TierId, { openCollective: string; githubSponsors: string }> = {
  supporter: {
    openCollective: 'https://opencollective.com/lucide-icons/contribute/basic-73095/checkout?interval=month&amount=5&contributeAs=me',
    githubSponsors: 'https://github.com/sponsors/lucide-icons/sponsorships?tier_id=671689',
  },
  backer: {
    openCollective: 'https://opencollective.com/lucide-icons/contribute/awesome-backer-73677/checkout?interval=month&amount=20&contributeAs=me',
    githubSponsors: 'https://github.com/sponsors/lucide-icons/sponsorships?tier_id=671692',
  },
  bronze: {
    openCollective: 'https://opencollective.com/lucide-icons/contribute/donation-55643/checkout?interval=month&amount=100&contributeAs=me',
    githubSponsors: 'https://github.com/sponsors/lucide-icons/sponsorships?tier_id=675253',
  },
  gold: {
    openCollective: 'https://opencollective.com/lucide-icons/contribute/champions-circle-73678/checkout?interval=month&amount=500&contributeAs=me',
    githubSponsors: 'https://github.com/sponsors/lucide-icons/sponsorships?tier_id=675254',
  },
  platinum: {
    openCollective: 'https://opencollective.com/lucide-icons/contribute/platinum-107266/checkout?interval=month&amount=1000&contributeAs=me',
    githubSponsors: 'https://github.com/sponsors/lucide-icons/sponsorships?tier_id=675255',
  },
};
