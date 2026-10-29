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
    openCollective: '',
    githubSponsors: '',
  },
  backer: {
    openCollective: '',
    githubSponsors: '',
  },
  bronze: {
    openCollective: '',
    githubSponsors: '',
  },
  gold: {
    openCollective: '',
    githubSponsors: '',
  },
  platinum: {
    openCollective: '',
    githubSponsors: '',
  },
};
