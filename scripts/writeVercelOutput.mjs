import path from 'path';
import fs from 'fs';

const currentDir = process.cwd();

const vercelRouteConfig = {
  version: 3,
  overrides: {},
  routes: [
    {
      handle: 'filesystem',
    },
    {
      src: '(?<url>/api/.*)',
      dest: '/__nitro?url=$url',
    },
  ],
};

const output = JSON.stringify(vercelRouteConfig, null, 2);

const vercelOutputJosn = path.resolve(currentDir, '.vercel/output/config.json');

fs.writeFileSync(vercelOutputJosn, output, 'utf-8');
