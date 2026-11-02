import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { TIERS, type TierId } from '../docs/.vitepress/theme/components/sponsor/tiers.ts';
import {
  type Account,
  fetchCollective,
  getCurrentSponsors,
  getLocalLogos,
  getOpenCollectiveLogo,
  getWebsite,
} from '../docs/scripts/helpers/openCollective.mts';

const rootPath = join(import.meta.dirname, '..');
const mainReadmePath = join(rootPath, 'README.md');

const tiersStartMarker = '[//]: <> (Sponsor tiers start)';
const tiersEndMarker = '[//]: <> (Sponsor tiers end)';
const mainReadmeOnlyStartMarker = '[//]: <> (Main README only start)';
const mainReadmeOnlyEndMarker = '[//]: <> (Main README only end)';

/**
 * How each sponsor tier shows up in the READMEs, following the tier perks in tiers.ts.
 * Tiers that are not in the npm package READMEs are wrapped in the "Main README only" markers.
 * Only tiers with `customLogo` use the logos in docs/public/sponsors, the others use their avatar.
 */
const README_TIERS: Record<
  TierId,
  { title: string; logoHeight: number; inPackages: boolean; customLogo: boolean }
> = {
  platinum: { title: 'Platinum 💎', logoHeight: 96, inPackages: true, customLogo: true },
  gold: { title: 'Gold 🥇', logoHeight: 64, inPackages: true, customLogo: true },
  bronze: { title: 'Bronze 🥉', logoHeight: 48, inPackages: true, customLogo: true },
  backer: { title: 'Backers 🍺', logoHeight: 32, inPackages: false, customLogo: false },
  supporter: { title: 'Supporters ☕️', logoHeight: 32, inPackages: false, customLogo: false },
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

/** Uses a `<picture>` to switch to the dark logo in dark mode, when there is one. */
function renderSponsor(account: Account, height: number, customLogo: boolean) {
  const logos: { light?: string; dark?: string } = customLogo ? getLocalLogos(account.slug) : {};
  const src = logos.light ? `docs/public/sponsors/${logos.light}` : getOpenCollectiveLogo(account);
  const alt = account.description ? `${account.name} – ${account.description}` : account.name;

  const image = `<img src="${escapeHtml(src)}" height="${height}" alt="${escapeHtml(alt)}" />`;
  const logo = logos.dark
    ? `<picture><source media="(prefers-color-scheme: dark)" srcset="docs/public/sponsors/${escapeHtml(logos.dark)}" />${image}</picture>`
    : image;

  return `<a href="${escapeHtml(getWebsite(account))}">${logo}</a>`;
}

function renderTiers({ orders }: Awaited<ReturnType<typeof fetchCollective>>) {
  const sponsorsByTier = Map.groupBy(getCurrentSponsors(orders.nodes), ({ tier }) => tier);

  // Highest tier first, so Platinum sponsors are at the top.
  const renderTierGroup = (inPackages: boolean) =>
    [...TIERS]
      .reverse()
      .filter(({ id }) => README_TIERS[id].inPackages === inPackages)
      .flatMap(({ id }) => {
        const sponsors = sponsorsByTier.get(id) ?? [];
        if (!sponsors.length) return [];

        const { title, logoHeight, customLogo } = README_TIERS[id];
        const sponsorLinks = sponsors
          .map(({ account }) => account)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((account) => renderSponsor(account, logoHeight, customLogo))
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
      .replaceAll('="docs/public/', '="https://lucide.dev/');
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
