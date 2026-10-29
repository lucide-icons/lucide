import { TIER_LINKS } from './tierLinks';

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
}

export const TIERS: Tier[] = [
  {
    id: 'supporter',
    name: 'Supporter',
    monthly: 5,
    audience: 'For individuals',
    summary: 'Sponsor badge and a Discord sponsor role.',
    perks: ['Sponsor badge', 'Discord sponsor role'],
  },
  {
    id: 'backer',
    name: 'Backer',
    monthly: 20,
    audience: 'For individuals and freelancers',
    summary: 'Name and avatar on lucide.dev/sponsor, plus your name in the README.',
    perks: ['Name and avatar on lucide.dev/sponsor', 'Name in the README'],
  },
  {
    id: 'bronze',
    name: 'Bronze',
    monthly: 100,
    audience: 'For small companies and startups',
    summary: 'Small logo on lucide.dev/sponsor and in npm READMEs, plus a sticker sheet.',
    perks: [
      'Small logo on lucide.dev/sponsor',
      'Small logo in the README and npm package READMEs',
      'Lucide sticker sheet',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    monthly: 500,
    yearly: 5000,
    audience: 'For companies shipping Lucide',
    summary: 'Large logo on the lucide.dev homepage and docs sidebar, plus a welcome t-shirt.',
    perks: [
      'Large logo on the lucide.dev homepage and docs sidebar',
      'Medium logo in npm package READMEs',
      'One-time welcome t-shirt',
    ],
    featured: true,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    monthly: 1000,
    yearly: 10000,
    audience: 'For large companies and dev tools',
    summary: 'Top homepage placement, logo on icon search and a private maintainer channel.',
    perks: [
      'Top placement on the homepage',
      'Logo on the icon search page',
      'Large logo in the top row of npm READMEs',
      'Dedicated welcome post',
      'Private channel with maintainers',
    ],
  },
];

export const getTier = (id: TierId) => TIERS.find((tier) => tier.id === id)!;

/** The tier before this one, whose perks it inherits. */
export const getPreviousTier = (id: TierId) => TIERS[TIERS.findIndex((tier) => tier.id === id) - 1];

/** The highest tier a monthly amount qualifies for, or `null` below the lowest tier. */
export function getTierForAmount(monthly: number) {
  return [...TIERS].reverse().find((tier) => monthly >= tier.monthly) ?? null;
}

/** Checkout links for a tier, or the general sponsor pages without a tier. */
export function getTierLinks(id?: TierId) {
  const links = id ? TIER_LINKS[id] : undefined;

  return {
    openCollective: links?.openCollective || OPEN_COLLECTIVE_URL,
    githubSponsors: links?.githubSponsors || GITHUB_SPONSORS_URL,
  };
}

export const formatEuro = (amount: number) => `€${amount.toLocaleString('en-US')}`;
