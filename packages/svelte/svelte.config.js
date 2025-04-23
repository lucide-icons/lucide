// eslint-disable-next-line import/no-extraneous-dependencies
import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess({
    typescript: true,
  }),
};
