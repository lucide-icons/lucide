import fs from 'fs';
import path from 'path';
import { loadEnvFile } from 'node:process';
import type { TierId } from '../.vitepress/theme/components/sponsor/tiers.ts';
import {
  fetchCollective,
  getCurrentSponsors,
  getLocalLogos,
  getOpenCollectiveLogo,
  getWebsite,
} from './helpers/openCollective.mts';

const currentDir = process.cwd();
const dataDirectory = path.resolve(currentDir, '.vitepress/data');
const outputPath = path.resolve(dataDirectory, 'sponsorsData.json');

try {
  // Load environment variables from .env file, if it exists.
  loadEnvFile(`${currentDir}/.env`);
} catch {
  // No .env file, so rely on the environment as-is.
}

export interface Sponsor {
  slug: string;
  name: string;
  website: string;
  /** Logo for the logo tiers, preferring a local file in `public/sponsors`. */
  image: string;
  /** Logo for dark mode, from `public/sponsors/dark`. */
  imageDark?: string;
  /** Square avatar for the backer and supporter tiers. */
  avatar: string;
  /** Recurring contribution normalised to a monthly amount, in the collective's currency. */
  monthlyAmount: number;
  /** The tier their yearly contribution qualifies for, `null` below the lowest tier. */
  tier: TierId | null;
}

let sponsors: Sponsor[] = [];
/** Everyone who ever contributed financially, including past and one-time contributors. */
let allTimeCount: number | null = null;

try {
  const collective = await fetchCollective();

  sponsors = getCurrentSponsors(collective.orders.nodes).map(({ account, yearlyAmount, tier }) => {
    const logos = getLocalLogos(account.slug);

    return {
      slug: account.slug,
      name: account.name,
      website: getWebsite(account),
      image: logos.light ? `/sponsors/${logos.light}` : getOpenCollectiveLogo(account),
      imageDark: logos.dark && `/sponsors/${logos.dark}`,
      avatar:
        account.imageUrl ?? `https://images.opencollective.com/${account.slug}/avatar/128.png`,
      monthlyAmount: Math.round((yearlyAmount / 12) * 100) / 100,
      tier,
    };
  });
  allTimeCount = collective.stats?.contributorsCount ?? null;
} catch (error) {
  console.warn(`Could not fetch sponsors, writing an empty list. ${error}`);
}

fs.mkdirSync(dataDirectory, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify({ allTimeCount, sponsors }, null, 2), 'utf-8');
console.log(`Wrote ${sponsors.length} sponsors to ${outputPath}`);
