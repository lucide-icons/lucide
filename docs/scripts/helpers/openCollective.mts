import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getTierForYearlyAmount } from '../../.vitepress/theme/components/sponsor/tiers.ts';

const COLLECTIVE_SLUG = 'lucide-icons';
const OPEN_COLLECTIVE_API = 'https://api.opencollective.com/graphql/v2';

const sponsorLogosPath = join(import.meta.dirname, '../../public/sponsors');

const GRACE_PERIOD_DAYS = 31;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export interface Account {
  slug: string;
  name: string;
  website: string | null;
  imageUrl: string | null;
  description: string | null;
}

interface Order {
  status: 'ACTIVE' | 'CANCELLED' | 'ERROR' | 'PAUSED';
  amount: { valueInCents: number | null } | null;
  frequency: 'MONTHLY' | 'YEARLY' | 'ONETIME' | null;
  nextChargeDate: string | null;
  fromAccount: Account;
}

interface CollectiveResponse {
  data?: {
    account: {
      stats: { contributorsCount: number | null } | null;
      orders: { nodes: Order[] };
    } | null;
  };
  errors?: { message: string }[];
}

const query = /* GraphQL */ `
  query Sponsors($slug: String!) {
    account(slug: $slug) {
      stats {
        contributorsCount
      }
      orders(filter: INCOMING, status: [ACTIVE, CANCELLED, ERROR, PAUSED], limit: 1000) {
        nodes {
          status
          amount {
            valueInCents
          }
          frequency
          nextChargeDate
          fromAccount {
            slug
            name
            website
            imageUrl
            description
          }
        }
      }
    }
  }
`;

export async function fetchCollective() {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (process.env.OPENCOLLECTIVE_TOKEN) {
    headers['Personal-Token'] = process.env.OPENCOLLECTIVE_TOKEN;
  }

  const response = await fetch(OPEN_COLLECTIVE_API, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables: { slug: COLLECTIVE_SLUG } }),
  });

  if (!response.ok) {
    throw new Error(`Open Collective API responded with ${response.status} ${response.statusText}`);
  }

  const { data, errors } = (await response.json()) as CollectiveResponse;
  if (errors?.length) {
    throw new Error(
      `Open Collective API errors: ${errors.map(({ message }) => message).join(', ')}`,
    );
  }
  if (!data?.account) {
    throw new Error(`Could not find Open Collective account "${COLLECTIVE_SLUG}"`);
  }

  return data.account;
}

/**
 * Active contributions, plus recurring ones that stopped (cancelled, failed or paused) less than
 * a month after their next payment was due. A failed payment doesn't drop a sponsor right away.
 */
function isCurrentSponsor({ status, nextChargeDate }: Order) {
  if (status === 'ACTIVE') return true;
  if (!nextChargeDate) return false;

  return Date.now() < new Date(nextChargeDate).getTime() + GRACE_PERIOD_DAYS * DAY_IN_MS;
}

function getYearlyAmount({ amount, frequency }: Order) {
  const value = (amount?.valueInCents ?? 0) / 100;

  return frequency === 'YEARLY' ? value : value * 12;
}

/**
 * The current sponsors with everything they contribute in a year and the tier that qualifies
 * for, highest amount first.
 */
export function getCurrentSponsors(orders: Order[]) {
  const yearlyAmounts = new Map<string, { account: Account; yearlyAmount: number }>();

  orders.filter(isCurrentSponsor).forEach((order) => {
    const sponsor = yearlyAmounts.get(order.fromAccount.slug);

    if (sponsor) {
      sponsor.yearlyAmount += getYearlyAmount(order);
    } else {
      yearlyAmounts.set(order.fromAccount.slug, {
        account: order.fromAccount,
        yearlyAmount: getYearlyAmount(order),
      });
    }
  });

  return [...yearlyAmounts.values()]
    .map(({ account, yearlyAmount }) => {
      const roundedAmount = Math.round(yearlyAmount * 100) / 100;

      return {
        account,
        yearlyAmount: roundedAmount,
        tier: getTierForYearlyAmount(roundedAmount)?.id ?? null,
      };
    })
    .sort(
      (a, b) => b.yearlyAmount - a.yearlyAmount || a.account.name.localeCompare(b.account.name),
    );
}

const findLogo = (fileName: string) =>
  ['svg', 'png']
    .map((extension) => `${fileName}.${extension}`)
    .find((file) => existsSync(join(sponsorLogosPath, file)));

/**
 * Custom logos in docs/public/sponsors, as paths relative to that directory.
 * A logo in docs/public/sponsors/dark is used in dark mode.
 */
export function getLocalLogos(slug: string) {
  return { light: findLogo(slug), dark: findLogo(`dark/${slug}`) };
}

export const getWebsite = ({ slug, website }: Account) =>
  website || `https://opencollective.com/${slug}`;

export const getOpenCollectiveLogo = ({ slug, imageUrl }: Account) =>
  imageUrl ?? `https://images.opencollective.com/${slug}/logo/256.png`;
