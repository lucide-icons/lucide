/* eslint-disable no-restricted-syntax,  no-await-in-loop */
import fs from 'fs';
import path from 'path';
import { loadEnvFile } from 'node:process';
import { readSvgDirectory } from '@lucide/helpers';

const currentDir = process.cwd();
const dataDirectory = path.resolve(currentDir, '.vitepress/data');

try {
  // Load environment variables from .env file, if it exists.
  loadEnvFile(`${currentDir}/.env`);
} catch (error) {}

interface IconCollection {
  /** Human readable name, used for logging. */
  name: string;
  /** Directory containing the icon `.json` files. */
  iconsDir: string;
  /** Directory the `${iconName}.json` popularity files are written to. */
  outputDir: string;
  /** Matches an analytics route and captures the icon name in group 1. */
  routePattern: RegExp;
}

// Lab must come before the default collection because `/icons/lab/foo` also
// matches the default `/icons/(...)` pattern; the first match wins per route.
const iconCollections: IconCollection[] = [
  {
    name: 'lab',
    iconsDir: path.resolve(currentDir, '../lab'),
    outputDir: path.resolve(dataDirectory, 'lab', 'iconPopularity'),
    // e.g. /icons/lab/burger, /icons/lab/burger/ or /icons/lab/burger?ref=homepage
    routePattern: /^\/icons\/lab\/([^\/\?]+)(?:[\/\?]|$)/,
  },
  {
    name: 'default',
    iconsDir: path.resolve(currentDir, '../icons'),
    outputDir: path.resolve(dataDirectory, 'iconPopularity'),
    // e.g. /icons/activity, /icons/activity/ or /icons/activity?ref=homepage
    routePattern: /^\/icons\/([^\/\?]+)(?:[\/\?]|$)/,
  },
];

interface CollectionData extends IconCollection {
  iconNames: string[];
  counts: Record<string, number>;
}

const collections: CollectionData[] = await Promise.all(
  iconCollections.map(async (collection) => {
    const iconJsonFiles = await readSvgDirectory(collection.iconsDir, '.json');
    const iconNames = iconJsonFiles.map((file) => path.basename(file, '.json'));

    return {
      ...collection,
      iconNames,
      counts: Object.fromEntries(iconNames.map((iconName) => [iconName, 0])),
    };
  }),
);

interface AnalyticsResponse {
  results: {
    dimensions: [route: string];
    metrics: [count: number];
  }[];
}

const writeIconPopularity = async ({ name, outputDir, counts }: CollectionData) => {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  const writePopularityPromises = Object.entries(counts).map(([iconName, count]) => {
    const location = path.resolve(outputDir, `${iconName}.json`);
    return fs.promises.writeFile(location, JSON.stringify({ count }, null, 2), 'utf-8');
  });

  await Promise.all(writePopularityPromises);
  console.log(
    'Successfully written icon popularity data for',
    writePopularityPromises.length,
    `${name} icons.`,
  );
};

const writeAllIconPopularity = () => Promise.all(collections.map(writeIconPopularity));

if (process.env.LUCIDE_ANALYTICS_TOKEN === undefined) {
  console.warn('LUCIDE_ANALYTICS_TOKEN environment variable is not set. Writing default icon popularity data.');
  await writeAllIconPopularity();
  process.exit(0);
}

try {
  const response = await fetch('https://analytics.lucide.dev/api/v2/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LUCIDE_ANALYTICS_TOKEN}`,
    },
    body: JSON.stringify({
      "site_id": "lucide.dev",
      "metrics": [
          "visitors"
      ],
      "dimensions": [
          "visit:entry_page"
      ],
      "date_range": "12mo"
    }),
  })

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const analyticsData: AnalyticsResponse = await response.json();

  for (const { dimensions, metrics } of analyticsData.results) {
    const [route] = dimensions;
    const [count] = metrics;

    if (!route.startsWith('/icons')) {
      continue;
    }

    // Route each visit to the first collection whose pattern matches. Lab is
    // checked first so `/icons/lab/foo` is not swallowed by the default pattern.
    for (const collection of collections) {
      const match = route.match(collection.routePattern);
      if (!match) {
        continue;
      }

      const iconName = match[1];
      if (collection.iconNames.includes(iconName)) {
        collection.counts[iconName] += count;
      }

      break;
    }
  }

  await writeAllIconPopularity();

} catch (error) {
  console.error('Error fetching analytics data:', error);
  await writeAllIconPopularity();
}
