import { defineHandler } from 'nitro/h3';
import iconMetaData from '~/.vitepress/data/lab/iconMetaData';

export default defineHandler((event) => {
  event.res.headers.set('Cache-Control', 'public, max-age=86400');
  event.res.headers.set('Access-Control-Allow-Origin', '*');

  for (const iconDetail in iconMetaData) {
    // Remove $schema from the response
    delete iconMetaData[iconDetail]['$schema'];
  }

  return iconMetaData;
});
