const LATEST_RELEASE_API = 'https://api.github.com/repos/lucide-icons/lucide/releases/latest';

/**
 * Tag of the latest GitHub release, or `null` when GitHub can't be reached, so a dropped
 * connection hides the version badge instead of failing the whole docs build.
 */
async function fetchLatestVersion(attempts = 2): Promise<string | null> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(LATEST_RELEASE_API);
      if (!response.ok) return null;

      const { tag_name } = (await response.json()) as { tag_name: string };

      return tag_name ?? null;
    } catch (error) {
      if (attempt === attempts) {
        console.warn(`Could not fetch the latest Lucide release. ${error}`);
      }
    }
  }

  return null;
}

const loader = {
  async load() {
    return {
      version: await fetchLatestVersion(),
    };
  },
};

declare const data: Awaited<ReturnType<typeof loader.load>>;

export { data };
export default loader;
