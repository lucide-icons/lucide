import iconNodes from '../../../data/iconNodes';
import fetchPackages from '../../../lib/fetchPackages';

const NPM_DOWNLOADS_API = 'https://api.npmjs.org/downloads/point/last-week';

/**
 * Packages that are no longer in the repo but are still published and installed.
 */
const LEGACY_PACKAGES = ['lucide-vue-next', 'lucide-vue', 'lucide-svelte', 'lucide-angular'];

async function fetchStars() {
  try {
    const response = await fetch('https://api.github.com/repos/lucide-icons/lucide');
    if (!response.ok) return null;

    const { stargazers_count } = (await response.json()) as { stargazers_count: number };

    return stargazers_count;
  } catch {
    return null;
  }
}

async function fetchDownloads(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`npm downloads API responded with ${response.status} for ${url}`);
  }

  return response.json();
}

/**
 * Sum of last week's npm downloads of every published Lucide package, or `null` when any
 * request fails, so a partial total never shows up as the real number.
 */
async function fetchWeeklyDownloads() {
  try {
    const packageNames = (await fetchPackages())
      .filter((packageJson) => packageJson?.name && !packageJson.private)
      .map(({ name }) => name)
      .concat(LEGACY_PACKAGES);

    // The bulk endpoint only accepts unscoped packages, scoped ones are fetched one by one.
    const unscoped = packageNames.filter((name) => !name.startsWith('@'));
    const scoped = packageNames.filter((name) => name.startsWith('@'));

    const [bulk, ...single] = await Promise.all([
      fetchDownloads(`${NPM_DOWNLOADS_API}/${unscoped.join(',')}`) as Promise<
        Record<string, { downloads: number } | null>
      >,
      ...scoped.map(
        (name) => fetchDownloads(`${NPM_DOWNLOADS_API}/${name}`) as Promise<{ downloads: number }>,
      ),
    ]);

    return [...Object.values(bulk), ...single].reduce(
      (total, result) => total + (result?.downloads ?? 0),
      0,
    );
  } catch (error) {
    console.warn(`Could not fetch npm downloads. ${error}`);
    return null;
  }
}

const loader = {
  async load() {
    const [stars, weeklyDownloads] = await Promise.all([fetchStars(), fetchWeeklyDownloads()]);

    return {
      stars,
      weeklyDownloads,
      iconsCount: Object.keys(iconNodes).length,
    };
  },
};

declare const data: Awaited<ReturnType<typeof loader.load>>;

export { data };
export default loader;
