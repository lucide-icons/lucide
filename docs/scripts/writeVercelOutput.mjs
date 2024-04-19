import path from 'path';
import fs from 'fs';
/* eslint-disable import/no-extraneous-dependencies */
import { getIconMetaData } from '@lucide/build-icons';
import { getCurrentDirPath } from '@lucide/helpers';

const currentDir = process.cwd();
const scriptDir = getCurrentDirPath(import.meta.url);

const iconMetaData = await getIconMetaData(path.resolve(scriptDir, '../icons'));

const iconAliasesRedirectRoutes = Object.entries(iconMetaData)
  .filter(([, { aliases }]) => aliases?.length)
  .map(([iconName, { aliases }]) => {
    const aliasRouteMatches = aliases.join('|');

    return {
      src: `/icons/(${aliasRouteMatches})`,
      status: 302,
      headers: {
        Location: `/icons/${iconName}`,
      },
    };
  });

const vercelRouteConfig = {
  version: 3,
  overrides: {},
  cleanUrls: true,
  routes: [
    {
      handle: 'filesystem',
    },
    {
      src: '(?<url>/api/.*)',
      dest: '/__nitro?url=$url',
    },
    ...iconAliasesRedirectRoutes,
  ],
};

const output = JSON.stringify(vercelRouteConfig, null, 2);

const vercelOutputJSON = path.resolve(currentDir, '.vercel/output/config.json');

fs.writeFileSync(vercelOutputJSON, output, 'utf-8');
