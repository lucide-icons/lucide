# grid-window (vendored)

Built `dist` output of [@grid-window/core](https://github.com/ericfennis/grid-window/tree/main/packages/core)
and [@grid-window/vue](https://github.com/ericfennis/grid-window/tree/main/packages/vue) 0.2.0,
commit `07da695`, copied here until the packages are published on npm.

- `core.js` / `core.d.ts`: `packages/core/dist/index.*`
- `vue.js` / `vue.d.ts`: `packages/vue/dist/index.*`, with `@grid-window/core` rewritten to `./core.js`

To update: `pnpm build` in grid-window and copy the files again. Once published, replace this
folder with the `@grid-window/vue` dependency.
