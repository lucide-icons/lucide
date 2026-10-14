import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const COLLECTIVE_SLUG = 'lucide-icons';
const OPEN_COLLECTIVE_API = 'https://api.opencollective.com/graphql/v2';

const rootPath = join(import.meta.dirname, '..');
const mainReadmePath = join(rootPath, 'README.md');
const sponsorLogosPath = join(rootPath, 'docs/public/sponsors');

const tiersStartMarker = '[//]: <> (Sponsor tiers start)';
const tiersEndMarker = '[//]: <> (Sponsor tiers end)';

/**
 * Headings for the Open Collective tiers, keyed by tier slug.
 * Tiers that are not listed here fall back to their Open Collective name.
 */
const TIER_TITLES: Record<string, string> = {
  'hero-backer': 'Hero backers 🦸',
  'awesome-backer': 'Awesome backers 🍺',
  backer: 'Backers ☕',
};

interface Account {
  slug: string;
  name: string;
  website: string | null;
  imageUrl: string | null;
  description: string | null;
}

interface Tier {
  slug: string;
  name: string;
  amount: { valueInCents: number | null } | null;
}

interface Order {
  tier: Pick<Tier, 'slug'> | null;
  fromAccount: Account;
}

interface CollectiveResponse {
  data?: {
    account: {
      tiers: { nodes: Tier[] };
      orders: { nodes: Order[] };
    } | null;
  };
  errors?: { message: string }[];
}

const query = /* GraphQL */ `
  query Sponsors($slug: String!) {
    account(slug: $slug) {
      ... on AccountWithContributions {
        tiers(limit: 100) {
          nodes {
            slug
            name
            amount {
              valueInCents
            }
          }
        }
      }
      orders(filter: INCOMING, status: [ACTIVE], limit: 1000) {
        nodes {
          tier {
            slug
          }
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

async function fetchCollective() {
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
    throw new Error(`Open Collective API errors: ${errors.map(({ message }) => message).join(', ')}`);
  }
  if (!data?.account) {
    throw new Error(`Could not find Open Collective account "${COLLECTIVE_SLUG}"`);
  }

  return data.account;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function getLogo({ slug, imageUrl }: Account) {
  const localLogo = ['svg', 'png'].find((extension) =>
    existsSync(join(sponsorLogosPath, `${slug}.${extension}`)),
  );
  if (localLogo) return `docs/public/sponsors/${slug}.${localLogo}`;

  return imageUrl ?? `https://images.opencollective.com/${slug}/logo/256.png`;
}

function renderSponsor(account: Account) {
  const href = account.website || `https://opencollective.com/${account.slug}`;
  const alt = account.description ? `${account.name} – ${account.description}` : account.name;

  return `<a href="${escapeHtml(href)}"><img src="${escapeHtml(getLogo(account))}" width="180" alt="${escapeHtml(alt)}" /></a>`;
}

function renderTiers({ tiers, orders }: Awaited<ReturnType<typeof fetchCollective>>) {
  const sponsorsByTier = new Map<string, Map<string, Account>>();

  orders.nodes.forEach(({ tier, fromAccount }) => {
    if (!tier) return;
    if (!sponsorsByTier.has(tier.slug)) sponsorsByTier.set(tier.slug, new Map());
    sponsorsByTier.get(tier.slug)!.set(fromAccount.slug, fromAccount);
  });

  return [...tiers.nodes]
    .sort((a, b) => (b.amount?.valueInCents ?? 0) - (a.amount?.valueInCents ?? 0))
    .flatMap((tier) => {
      const sponsors = [...(sponsorsByTier.get(tier.slug)?.values() ?? [])];
      if (!sponsors.length) return [];

      if (!TIER_TITLES[tier.slug]) {
        console.warn(`No title configured for tier "${tier.slug}", using "${tier.name}"`);
      }

      const sponsorLinks = sponsors
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(renderSponsor)
        .join('\n');

      return `### ${TIER_TITLES[tier.slug] ?? tier.name}\n\n${sponsorLinks}`;
    })
    .join('\n\n');
}

async function updateReadmeTiers() {
  const mainReadme = readFileSync(mainReadmePath, 'utf8');
  const startIndex = mainReadme.indexOf(tiersStartMarker);
  const endIndex = mainReadme.indexOf(tiersEndMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Could not find "${tiersStartMarker}" and "${tiersEndMarker}" in README.md`);
  }

  const tiersMarkup = renderTiers(await fetchCollective());

  writeFileSync(
    mainReadmePath,
    [
      mainReadme.slice(0, startIndex + tiersStartMarker.length),
      tiersMarkup,
      mainReadme.slice(endIndex),
    ]
      .filter(Boolean)
      .join('\n\n'),
  );
  console.log(`Updated sponsor tiers in ${mainReadmePath}`);
}

function updatePackageSponsors() {
  const packagesPath = join(rootPath, 'packages');
  const mainReadme = readFileSync(mainReadmePath, 'utf8');
  const sponsorsRegex = /(\[\/\/]: <> \(Sponsors\).+)$/s;
  const sponsorsBlock = sponsorsRegex.exec(mainReadme);
  if (sponsorsBlock?.[1]) {
    const packageSponsorsBlock = sponsorsBlock[1].replaceAll('src="docs/public', 'src="https://lucide.dev')
    readdirSync(packagesPath).forEach((packagePath) => {
      if (['lucide-figma', 'shared'].includes(packagePath) || packagePath.startsWith('.')) {
        return;
      }
      const readmePath = join(packagesPath, packagePath, 'README.md');
      if (existsSync(readmePath)) {
        const readmeContent = readFileSync(readmePath, 'utf8');
        if (sponsorsRegex.test(readmeContent)) {
          writeFileSync(readmePath, readmeContent.replace(sponsorsRegex, packageSponsorsBlock));
          console.log(`Upgraded Sponsors block in ${readmePath}`);
        } else {
          console.error(`Could not find Sponsors block in ${readmePath}`)
        }
      } else {
        console.warn(`No readme found at ${readmePath}`);
      }
    })
  } else {
    console.error('Could not identify Sponsors block')
  }
}

if (!process.argv.includes('--skip-fetch')) {
  await updateReadmeTiers();
}
updatePackageSponsors();
