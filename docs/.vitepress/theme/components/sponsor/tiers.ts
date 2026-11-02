export const OPEN_COLLECTIVE_URL = 'https://opencollective.com/lucide-icons';
export const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/lucide-icons';
export const PARTNER_EMAIL = 'info@lucide.dev';

export type TierId = 'supporter' | 'backer' | 'bronze' | 'gold' | 'platinum';

export interface Tier {
  id: TierId;
  name: string;
  /** Monthly amount in euros. */
  monthly: number;
  /** Yearly amount in euros, for tiers that can be paid yearly. */
  yearly?: number;
  audience: string;
  /** One-sentence summary of the perks, used in the amount picker. */
  summary: string;
  /** Perks this tier adds on top of the previous one. */
  perks: string[];
  featured?: boolean;
  /**
   * Tier slug on Open Collective. Open the tier on opencollective.com/lucide-icons and copy
   * it from the "Contribute" link, e.g. `basic-73095` from
   * https://opencollective.com/lucide-icons/contribute/basic-73095/checkout
   */
  openCollectiveTier: string;
  /**
   * Tier id on GitHub Sponsors. Open the tier on github.com/sponsors/lucide-icons and copy
   * the `tier_id` from its link, e.g. `671689` from
   * https://github.com/sponsors/lucide-icons/sponsorships?tier_id=671689
   */
  githubSponsorsTierId: number;
}

export const TIERS: Tier[] = [
  {
    id: 'supporter',
    name: 'Supporter',
    monthly: 5,
    audience: 'For individuals',
    summary:
      'Sponsor badge on GitHub, a Discord sponsor role and your avatar on lucide.dev/sponsor.',
    perks: [
      'Sponsor badge on GitHub',
      'Discord sponsor role',
      'Small avatar on lucide.dev/sponsor',
    ],
    openCollectiveTier: 'basic-73095',
    githubSponsorsTierId: 671689,
  },
  {
    id: 'backer',
    name: 'Backer',
    monthly: 20,
    audience: 'For individuals and freelancers',
    summary: 'Everything in Supporter, plus a small avatar or logo in the main README.',
    perks: ['Small avatar or logo in the main README on GitHub'],
    openCollectiveTier: 'awesome-backer-73677',
    githubSponsorsTierId: 671692,
  },
  {
    id: 'bronze',
    name: 'Bronze',
    monthly: 100,
    audience: 'For small companies and startups',
    summary: 'Small logo on lucide.dev/sponsor and in all npm READMEs, plus a sticker sheet.',
    perks: [
      'Small logo on lucide.dev/sponsor',
      'Small logo in all npm package READMEs',
      'Free Lucide sticker sheet',
    ],
    openCollectiveTier: 'donation-55643',
    githubSponsorsTierId: 675253,
  },
  {
    id: 'gold',
    name: 'Gold',
    monthly: 500,
    yearly: 5000,
    audience: 'For companies shipping Lucide',
    summary: 'Medium logo on the lucide.dev homepage and docs sidebar, plus a welcome t-shirt.',
    perks: [
      'Medium logo in the main README on GitHub',
      'Medium logo in all npm package READMEs',
      'Medium logo in the lucide.dev homepage sponsor strip and docs sidebar',
      'Medium logo on lucide.dev/sponsor',
      'One-time welcome t-shirt',
    ],
    featured: true,
    openCollectiveTier: 'champions-circle-73678',
    githubSponsorsTierId: 675254,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    monthly: 1000,
    yearly: 10000,
    audience: 'For large companies and dev tools',
    summary:
      'Top homepage placement, logo on icon search, a private maintainer channel and a $100 merch voucher.',
    perks: [
      'Top placement on the homepage',
      'Large logo at the top of the main README on GitHub',
      'Large logo at the top of all npm package READMEs',
      'Large logo in the lucide.dev homepage sponsor strip and docs sidebar',
      'Logo on the icon search page',
      'Dedicated welcome post on X and Bluesky',
      'Private channel with maintainers',
      '$100 merch shop voucher',
    ],
    openCollectiveTier: 'platinum-107266',
    githubSponsorsTierId: 675255,
  },
];

export const getTier = (id: TierId) => TIERS.find((tier) => tier.id === id)!;

/** The tier before this one, whose perks it inherits. */
export const getPreviousTier = (id: TierId) => TIERS[TIERS.findIndex((tier) => tier.id === id) - 1];

/** The highest tier a monthly amount qualifies for, or `null` below the lowest tier. */
export function getTierForAmount(monthly: number) {
  return [...TIERS].reverse().find((tier) => monthly >= tier.monthly) ?? null;
}

/**
 * The highest tier a yearly total qualifies for, or `null` below the lowest tier. Tiers with a
 * yearly price (two months free) count that price, so a yearly Gold sponsor isn't listed as Bronze.
 */
export function getTierForYearlyAmount(yearly: number) {
  return [...TIERS].reverse().find((tier) => yearly >= (tier.yearly ?? tier.monthly * 12)) ?? null;
}

export type Frequency = 'monthly' | 'once';

const getOpenCollectiveParams = (amount: number, frequency: Frequency) =>
  new URLSearchParams({
    interval: frequency === 'monthly' ? 'month' : 'oneTime',
    amount: String(amount),
    contributeAs: 'me',
  });

/** Checkout links for a tier, or the general sponsor pages without a tier. */
export function getTierLinks(tier?: Tier) {
  if (!tier) {
    return { openCollective: OPEN_COLLECTIVE_URL, githubSponsors: GITHUB_SPONSORS_URL };
  }

  const openCollectiveParams = getOpenCollectiveParams(tier.monthly, 'monthly');

  return {
    openCollective: `${OPEN_COLLECTIVE_URL}/contribute/${tier.openCollectiveTier}/checkout?${openCollectiveParams}`,
    githubSponsors: `${GITHUB_SPONSORS_URL}/sponsorships?tier_id=${tier.githubSponsorsTierId}`,
  };
}

/** Checkout links prefilled with a custom amount and frequency. */
export function getAmountLinks(amount: number, frequency: Frequency) {
  const openCollectiveParams = getOpenCollectiveParams(amount, frequency);
  const githubSponsorsParams = new URLSearchParams({
    frequency: frequency === 'monthly' ? 'recurring' : 'one-time',
    amount: String(amount),
  });

  return {
    openCollective: `${OPEN_COLLECTIVE_URL}/donate?${openCollectiveParams}`,
    githubSponsors: `${GITHUB_SPONSORS_URL}/sponsorships?${githubSponsorsParams}`,
  };
}

export const formatEuro = (amount: number) => `€${amount.toLocaleString('en-US')}`;
