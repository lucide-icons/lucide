/* eslint-disable no-restricted-syntax,  no-await-in-loop */
import fs from 'fs';
import path from 'path';
import { loadEnvFile } from 'node:process';
import { readSvgDirectory } from '@lucide/helpers';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const iconPopularityDirectory = path.resolve(currentDir, '.vitepress/data', 'iconPopularity');

loadEnvFile(`${currentDir}/.env.local`);

if (fs.existsSync(iconPopularityDirectory)) {
  fs.rmSync(iconPopularityDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(iconPopularityDirectory)) {
  fs.mkdirSync(iconPopularityDirectory);
}

const iconJsonFiles = await readSvgDirectory(ICONS_DIR, '.json');
const iconNames = iconJsonFiles.map((file) => path.basename(file, '.json'));

const defaultIconNamePopularity: Record<string, number> = Object.fromEntries(
  iconNames.map((iconName) => [iconName, 0])
);

interface AnalyticsResponse {
  results: {
    dimensions: [route: string];
    metrics: [count: number];
  }[];
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

  const iconVisitCounts = analyticsData.results.reduce((acc, { dimensions, metrics }) => {
    const [route] = dimensions;
    const [count] = metrics;

    if (!route.startsWith('/icons')) {
      return acc
    }
    // Only match routes that start with /icons/ and end with an icon name, e.g. /icons/activity, /icons/activity/ or /icons/activity?ref=homepage
    const match = route.match(/^\/icons\/([^\/\?]+)(?:[\/\?]|$)/);
    if (match) {
      const iconName = match[1];

      if (iconNames.includes(iconName)) {
        acc[iconName] = (acc[iconName] || 0) + count;
      }
    }

    return acc;
  }, defaultIconNamePopularity);

  const writePopularityPromises = Object.entries(iconVisitCounts).map(([iconName, count]) => {
    const location = path.resolve(iconPopularityDirectory, `${iconName}.json`);
    return fs.promises.writeFile(location, JSON.stringify({ count }, null, 2), 'utf-8');
  });

  await Promise.all(writePopularityPromises);
  console.log('Successfully written icon popularity data for', writePopularityPromises.length, 'icons.');

} catch (error) {
  console.error('Error fetching analytics data:', error);
}

