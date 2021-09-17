import { join } from 'path';

export default function() {
  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({
      path: join(__dirname, 'dist', 'esm', 'icons'),
      prefix: 'Icon',
      ignore: ['**/index.js'],
    });
  });
}
