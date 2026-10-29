import fs from 'fs';
import path from 'path';
import { loadEnvFile } from 'node:process';

const COLLECTIVE_SLUG = 'lucide-icons';
const OPEN_COLLECTIVE_API = 'https://api.opencollective.com/graphql/v2';

const currentDir = process.cwd();
const dataDirectory = path.resolve(currentDir, '.vitepress/data');
const sponsorLogosPath = path.resolve(currentDir, 'public/sponsors');
const outputPath = path.resolve(dataDirectory, 'sponsorsData.json');

try {
  // Load environment variables from .env file, if it exists.
  loadEnvFile(`${currentDir}/.env`);
} catch {
  // No .env file, so rely on the environment as-is.
}

interface Account {
  slug: string;
  name: string;
  website: string | null;
  imageUrl: string | null;
}

interface Order {
  amount: { valueInCents: number | null } | null;
  frequency: 'MONTHLY' | 'YEARLY' | 'ONETIME' | null;
  fromAccount: Account;
}

interface CollectiveResponse {
  data?: {
    account: {
      orders: { nodes: Order[] };
    } | null;
  };
  errors?: { message: string }[];
}

export interface Sponsor {
  slug: string;
  name: string;
  website: string;
  /** Logo for the logo tiers, preferring a local file in `public/sponsors`. */
  image: string;
  /** Square avatar for the backer and supporter tiers. */
  avatar: string;
  /** Recurring contribution normalised to a monthly amount, in the collective's currency. */
  monthlyAmount: number;
}

const query = /* GraphQL */ `
  query Sponsors($slug: String!) {
    account(slug: $slug) {
      orders(filter: INCOMING, status: [ACTIVE], limit: 1000) {
        nodes {
          amount {
            valueInCents
          }
          frequency
          fromAccount {
            slug
            name
            website
            imageUrl
          }
        }
      }
    }
  }
`;

async function fetchOrders() {
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

  return data.account.orders.nodes;
}

function getLogo({ slug, imageUrl }: Account) {
  const localLogo = ['svg', 'png'].find((extension) =>
    fs.existsSync(path.join(sponsorLogosPath, `${slug}.${extension}`)),
  );
  if (localLogo) return `/sponsors/${slug}.${localLogo}`;

  return imageUrl ?? `https://images.opencollective.com/${slug}/logo/256.png`;
}

function getMonthlyAmount({ amount, frequency }: Order) {
  const value = (amount?.valueInCents ?? 0) / 100;

  return frequency === 'YEARLY' ? value / 12 : value;
}

function toSponsors(orders: Order[]) {
  const sponsors = new Map<string, Sponsor>();

  orders.forEach((order) => {
    const { fromAccount } = order;
    const existing = sponsors.get(fromAccount.slug);

    if (existing) {
      existing.monthlyAmount += getMonthlyAmount(order);
      return;
    }

    sponsors.set(fromAccount.slug, {
      slug: fromAccount.slug,
      name: fromAccount.name,
      website: fromAccount.website || `https://opencollective.com/${fromAccount.slug}`,
      image: getLogo(fromAccount),
      avatar:
        fromAccount.imageUrl ??
        `https://images.opencollective.com/${fromAccount.slug}/avatar/128.png`,
      monthlyAmount: getMonthlyAmount(order),
    });
  });

  return [...sponsors.values()]
    .map((sponsor) => ({
      ...sponsor,
      monthlyAmount: Math.round(sponsor.monthlyAmount * 100) / 100,
    }))
    .sort((a, b) => b.monthlyAmount - a.monthlyAmount || a.name.localeCompare(b.name));
}

let sponsors: Sponsor[] = [];

try {
  sponsors = toSponsors(await fetchOrders());
} catch (error) {
  console.warn(`Could not fetch sponsors, writing an empty list. ${error}`);
}

fs.mkdirSync(dataDirectory, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify({ sponsors }, null, 2), 'utf-8');
console.log(`Wrote ${sponsors.length} sponsors to ${outputPath}`);
