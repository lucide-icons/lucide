import sponsorsData from '../../../data/sponsorsData.json';
import type { TierId } from './tiers';

export interface Sponsor {
  slug: string;
  name: string;
  website: string;
  image: string;
  imageDark?: string;
  avatar: string;
  monthlyAmount: number;
  tier: TierId | null;
}

export const sponsors = sponsorsData.sponsors as Sponsor[];

/** Everyone who ever contributed on Open Collective, `null` when the build couldn't fetch it. */
export const allTimeSponsorCount: number | null = sponsorsData.allTimeCount;

export const getSponsorsByTier = (tierId: TierId) => sponsors.filter(({ tier }) => tier === tierId);

const LOGO_TIERS: TierId[] = ['bronze', 'gold', 'platinum'];

/** Everyone below the first logo tier, shown as avatars. */
export const getSupporters = () =>
  sponsors.filter(({ tier }) => !tier || !LOGO_TIERS.includes(tier));
