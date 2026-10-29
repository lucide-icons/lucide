import sponsorsData from '../../../data/sponsorsData.json';
import { getTier, getTierForAmount, type TierId } from './tiers';

export interface Sponsor {
  slug: string;
  name: string;
  website: string;
  image: string;
  avatar: string;
  monthlyAmount: number;
}

export const sponsors: Sponsor[] = sponsorsData.sponsors;

export const getSponsorsByTier = (tierId: TierId) =>
  sponsors.filter(({ monthlyAmount }) => getTierForAmount(monthlyAmount)?.id === tierId);

/** Everyone below the first logo tier, shown as avatars. */
export const getSupporters = () =>
  sponsors.filter(({ monthlyAmount }) => monthlyAmount < getTier('bronze').monthly);
