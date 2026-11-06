import { defineHandler } from 'nitro/h3';
import iconMetaData from '~/.vitepress/data/iconMetaData';

export default defineHandler((event) => {
  event.res.headers.set('Cache-Control', 'public, max-age=86400');
  event.res.headers.set('Access-Control-Allow-Origin', '*');

  return Object.fromEntries(
    Object.entries(iconMetaData).map(([name, { categories }]) => [name, categories]),
  );
});
