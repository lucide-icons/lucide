import path from 'path';
import fs from 'fs';

const currentDir = process.cwd();

const vercelRouteConfig = {
  version: 3,
  overrides: {},
  // cleanUrls: true,
  routes: [
    {
      handle: 'filesystem',
    },
    // {
    //   source: '/icon/:path*',
    //   destination: '/icons/:path*',
    //   permanent: true,
    // },
    {
      src: '(?<url>/api/.*)',
      dest: '/__nitro?url=$url',
    },
    // {
    //   src: '/(.*)',
    //   status: 404,
    //   dest: '/static/404.html',
    // },
  ],
};

const output = JSON.stringify(vercelRouteConfig, null, 2);

const vercelOutputJosn = path.resolve(currentDir, '.vercel/output/config.json');

fs.writeFileSync(vercelOutputJosn, output, 'utf-8');
