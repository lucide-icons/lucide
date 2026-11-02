import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { TIERS, type TierId } from '../docs/.vitepress/theme/components/sponsor/tiers.ts';

const COLLECTIVE_SLUG = 'lucide-icons';
const OPEN_COLLECTIVE_API = 'https://api.opencollective.com/graphql/v2';

const rootPath = join(import.meta.dirname, '..');
const mainReadmePath = join(rootPath, 'README.md');
const sponsorLogosPath = join(rootPath, 'docs/public/sponsors');

const tiersStartMarker = '[//]: <> (Sponsor tiers start)';
const tiersEndMarker = '[//]: <> (Sponsor tiers end)';
const mainReadmeOnlyStartMarker = '[//]: <> (Main README only start)';
const mainReadmeOnlyEndMarker = '[//]: <> (Main README only end)';

const GRACE_PERIOD_DAYS = 31;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * How each sponsor tier shows up in the READMEs, following the tier perks in tiers.ts.
 * Tiers that are not in the npm package READMEs are wrapped in the "Main README only" markers.
 */
const README_TIERS: Record<TierId, { title: string; logoHeight: number; inPackages: boolean }> = {
  platinum: { title: 'Platinum 💎', logoHeight: 96, inPackages: true },
  gold: { title: 'Gold 🥇', logoHeight: 64, inPackages: true },
  bronze: { title: 'Bronze 🥉', logoHeight: 48, inPackages: true },
  backer: { title: 'Backers 🍺', logoHeight: 32, inPackages: false },
  supporter: { title: 'Supporters ☕️', logoHeight: 32, inPackages: false },
};

interface Account {
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
      orders: { nodes: Order[] };
    } | null;
  };
  errors?: { message: string }[];
}

const query = /* GraphQL */ `
  query Sponsors($slug: String!) {
    account(slug: $slug) {
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
    throw new Error(
      `Open Collective API errors: ${errors.map(({ message }) => message).join(', ')}`,
    );
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

  console.log(slug);

  if (localLogo) return `docs/public/sponsors/${slug}.${localLogo}`;

  return imageUrl ?? `https://images.opencollective.com/${slug}/logo/256.png`;
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
 * The highest tier a yearly total qualifies for. Tiers with a yearly price (two months free)
 * count that price, so a yearly Gold sponsor isn't listed as Bronze.
 */
function getTierForYearlyAmount(yearlyAmount: number) {
  return [...TIERS].reverse().find((tier) => yearlyAmount >= (tier.yearly ?? tier.monthly * 12));
}

/** Groups the active sponsors by tier, based on everything they contribute in a year. */
function getSponsorsByTier(orders: Order[]) {
  const sponsors = new Map<string, { account: Account; yearlyAmount: number }>();

  orders.forEach((order) => {
    const sponsor = sponsors.get(order.fromAccount.slug);

    if (sponsor) {
      sponsor.yearlyAmount += getYearlyAmount(order);
    } else {
      sponsors.set(order.fromAccount.slug, {
        account: order.fromAccount,
        yearlyAmount: getYearlyAmount(order),
      });
    }
  });

  return Map.groupBy(
    [...sponsors.values()],
    ({ yearlyAmount }) => getTierForYearlyAmount(Math.round(yearlyAmount * 100) / 100)?.id,
  );
}

function renderSponsor(account: Account, height: number) {
  const href = account.website || `https://opencollective.com/${account.slug}`;
  const alt = account.description ? `${account.name} – ${account.description}` : account.name;

  return `<a href="${escapeHtml(href)}"><img src="${escapeHtml(getLogo(account))}" height="${height}" alt="${escapeHtml(alt)}" /></a>`;
}

function renderTiers({ orders }: Awaited<ReturnType<typeof fetchCollective>>) {
  const sponsorsByTier = getSponsorsByTier(orders.nodes.filter(isCurrentSponsor));

  // Highest tier first, so Platinum sponsors are at the top.
  const renderTierGroup = (inPackages: boolean) =>
    [...TIERS]
      .reverse()
      .filter(({ id }) => README_TIERS[id].inPackages === inPackages)
      .flatMap(({ id }) => {
        const sponsors = sponsorsByTier.get(id) ?? [];
        if (!sponsors.length) return [];

        const { title, logoHeight } = README_TIERS[id];
        const sponsorLinks = sponsors
          .map(({ account }) => account)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((account) => renderSponsor(account, logoHeight))
          .join('\n');

        return `### ${title}\n\n${sponsorLinks}`;
      })
      .join('\n\n');

  const packageTiers = renderTierGroup(true);
  const mainReadmeOnlyTiers = renderTierGroup(false);

  return [
    packageTiers,
    mainReadmeOnlyTiers &&
      [mainReadmeOnlyStartMarker, mainReadmeOnlyTiers, mainReadmeOnlyEndMarker].join('\n\n'),
  ]
    .filter(Boolean)
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
  const mainReadmeOnlyRegex =
    /\[\/\/]: <> \(Main README only start\).*?\[\/\/]: <> \(Main README only end\)\s*/gs;
  const sponsorsBlock = sponsorsRegex.exec(mainReadme);
  if (sponsorsBlock?.[1]) {
    const packageSponsorsBlock = sponsorsBlock[1]
      .replace(mainReadmeOnlyRegex, '')
      .replaceAll('src="docs/public', 'src="https://lucide.dev');
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
          console.error(`Could not find Sponsors block in ${readmePath}`);
        }
      } else {
        console.warn(`No readme found at ${readmePath}`);
      }
    });
  } else {
    console.error('Could not identify Sponsors block');
  }
}

if (!process.argv.includes('--skip-fetch')) {
  await updateReadmeTiers();
}
updatePackageSponsors();
