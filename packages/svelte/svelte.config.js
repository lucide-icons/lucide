// eslint-disable-next-line import-x/no-extraneous-dependencies
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess({
    typescript: true,
  }),
};
