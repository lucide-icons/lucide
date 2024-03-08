import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import getIconMetaData from '../tools/build-icons/utils/getIconMetaData.mjs';
import { getCurrentDirPath } from './helpers.mjs';

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
})

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
    ...iconAliasesRedirectRoutes
  ],
};

const output = JSON.stringify(vercelRouteConfig, null, 2);

const vercelOutputJSON = path.resolve(currentDir, '.vercel/output/config.json');

fs.writeFileSync(vercelOutputJSON, output, 'utf-8');
