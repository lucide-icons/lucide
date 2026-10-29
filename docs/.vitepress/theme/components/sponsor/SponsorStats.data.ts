import iconNodes from '../../../data/iconNodes';

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

const loader = {
  async load() {
    return {
      stars: await fetchStars(),
      iconsCount: Object.keys(iconNodes).length,
    };
  },
};

declare const data: Awaited<ReturnType<typeof loader.load>>;

export { data };
export default loader;
