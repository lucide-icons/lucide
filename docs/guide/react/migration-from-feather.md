# Migration Guide: react-feather → lucide-react

`react-feather` is similar to `lucide-react`, the package is inspired by `react-feather`. The API is nearly identical, so migration is straightforward.

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
