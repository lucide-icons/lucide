import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const featherIconCount = 287;
const iconsDir = resolve(__dirname, '../../icons');

const loader = {
  watch: [`${iconsDir}/*.svg`],
  load() {
    const count = readdirSync(iconsDir).filter((file) => file.endsWith('.svg')).length;

    return {
      iconCount: Math.floor(count / 10) * 10,
      addedCount: Math.floor((count - featherIconCount) / 10) * 10,
    };
  },
};

declare const data: ReturnType<typeof loader.load>;

export { data };
export default loader;
