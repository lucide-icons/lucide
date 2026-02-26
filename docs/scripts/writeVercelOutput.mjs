import path from 'path';
import fs from 'fs';
import { getIconMetaData } from '@lucide/build-icons';
import { getCurrentDirPath } from '@lucide/helpers';

const currentDir = process.cwd();
const scriptDir = getCurrentDirPath(import.meta.url);

const iconMetaData = await getIconMetaData(path.resolve(scriptDir, '../../icons'));

const iconAliasesRedirectRoutes = Object.entries(iconMetaData)
  .filter(([, { aliases }]) => aliases?.length)
  .map(([iconName, { aliases }]) => {
    const aliasRouteMatches = aliases.map((alias) => alias.name).join('|');

    return {
      src: `/icons/${aliasRouteMatches}`,
      status: 302,
      headers: {
        Location: `/icons/${iconName}`,
      },
    };
  });


const vercelOutputJSON = path.resolve(currentDir, '.vercel/output/config.json');

const vercelConfig = await fs.promises.readFile(vercelOutputJSON, 'utf-8');

const vercelRouteConfig = JSON.parse(vercelConfig);

vercelRouteConfig.routes = [
  ...iconAliasesRedirectRoutes,
  ...vercelRouteConfig.routes,
]

// Adjust the existing catch-all route to only catch API routes, so that we can add a new catch-all route for 404s
const allCatchRoute = '/(.*)';
const fallBackIndex = vercelRouteConfig.routes.findIndex(route => route.handle === allCatchRoute);

vercelRouteConfig.routes[fallBackIndex].src = '/api/(.*)'
vercelRouteConfig.routes.push({
  src: allCatchRoute,
  dest: '/404.html',
})

const output = JSON.stringify(vercelRouteConfig, null, 2);

await fs.promises.writeFile(vercelOutputJSON, output, 'utf-8');
