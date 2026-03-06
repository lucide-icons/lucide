# Migration from v0

Brand icons are removed in v1. If you are using any of the following icons, you will need to replace them with a custom SVG or an alternative icon:

- Chromium
- Codepen
- Codesandbox
- Dribbble
- Facebook
- Figma
- Framer
- Github
- Gitlab
- Instagram
- LinkedIn
- Pocket
- RailSymbol (based on the British Rail logo)
- Slack

We recommend to use the official SVG icons provided by the respective brands, most of them can be found on their websites or in their brand guidelines. Alternatively, you can use the icons from [Simple Icons](https://simpleicons.org/), which provides a large collection of brand icons. Also with links to the official Brand Guidelines and SVG icons.

## Migration Guide: react-feather → lucide-react

`lucide-react` is a community-maintained fork of `react-feather` with ongoing icon updates and fixes. The API is nearly identical, so migration is straightforward.

## 1. Install the new package

```sh
npm install lucide-react
npm uninstall react-feather
```

## 2. Update imports

Replace all `react-feather` imports with `lucide-react`:

```diff
- import { Home, User } from 'react-feather'
+ import { Home, User } from 'lucide-react'
```

You can do this across your entire codebase with a find-and-replace:

- Find: `from 'react-feather'`
- Replace: `from 'lucide-react'`

## 3. Renamed icons

Four icons have been renamed. Update any usages of these:

| react-feather | lucide-react |
| ------------- | ------------ |
| `GitHub`      | `Github`     |
| `Grid`        | `LayoutGrid` |
| `Table`       | `Table2`     |
| `Tool`        | `Wrench`     |

### Examples

```diff
- import { GitHub, Grid, Table, Tool } from 'react-feather'
+ import { Github, LayoutGrid, Table2, Wrench } from 'lucide-react'

- <GitHub />
+ <Github />

- <Grid />
+ <LayoutGrid />

- <Table />
+ <Table2 />

- <Tool />
+ <Wrench />
```

## 4. All other icons

All remaining icons keep the same name and work as drop-in replacements. No other changes to props or usage are required.
