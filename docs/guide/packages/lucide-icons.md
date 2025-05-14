# Lucide Icons

This is a helper library that exports icon data in a tree-shakable, dynamically importable way, but provides no real rendering logic on its own.

Some of our packages, notably [
`@lucide/angular`](http://npmjs.com/package/@lucide/angular) can leverage this functionality to allow dynamically importing icons, and utilising tree-shaking when using static imports. You can also use this package to implement a third party package for a framework we do not yet support.

## Installation

::: code-group

```sh [pnpm]
pnpm install @lucide/icons
```

```sh [yarn]
yarn add @lucide/icons
```

```sh [npm]
npm install @lucide/icons
```

```sh [bun]
bun add @lucide/icons
```

:::

## Icon data format

Each icon is described by the following interface:

```typescript
export type LucideIconData = {
  name: string;
  node: LucideIconNode[];
} & ({ size: number } | { width: number; height: number; })
```

| name                         | type               | description                                                                  |
|------------------------------|--------------------|------------------------------------------------------------------------------|
| `name`                       | `string`           | The name of the icon.                                                        |
| `node`                       | `LucideIconNode[]` | A list of SVG paths, each path described as a `[tagName, attributes]` tuple. |
| `size` or `width` & `height` | `number`           | The dimensions of the icon.                                                  |

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon data descriptor can be imported separately. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

## Building icons

`@lucide/icons` provides four ways to build icons for later rendering, these are:

### `buildLucideIconData`

Returns the icon as a `LucideIconNode` tuple: `['svg', attributes, childNodes]`.

### Building SVG strings

`buildLucideSvg(icon: LucideIcon)`

Returns the icon

## Dynamic imports

It is possible to create one generic icon component to load icons, but it is not recommended.
Since it is importing all icons during build. This increases build time and the different modules it will create.

`DynamicIcon` is useful for applications that want to show icons dynamically by icon name. For example, when using a content management system with where icon names are stored in a database.

For static use cases, it is recommended to import the icons directly.

The same props can be passed to adjust the icon appearance. The
`name` prop is required to load the correct icon.

```js
import {lucideDynamicIconImports} from '@lucide/icons/dynamic';

const icon: LucideIconData = await lucideDynamicIconImports['house']().then();
```
