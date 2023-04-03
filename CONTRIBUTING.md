
# Contribution Guidelines

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Lucide. Feel free to propose changes to this document in a pull request.

## Pull Requests

Feel free to open a pull-request to contribute to this project.

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github)

Guidelines for pull requests:

- __Make your commit messages as descriptive as possible.__ Include as much information as you can. Explain anything that the file diffs themselves won’t make apparent.
- __Document your pull request__. Explain your fix, link to the relevant issue, add screenshots when adding new icons.
- __Make sure the target of your pull request is the relevant branch__. Most of bugfix or new feature should go to the `main` branch.
- __Include only related work__. If your pull request has unrelated commit, it won't be accepted.

### Pull Requests Including Icons

#### Guidelines

Please make sure you follow the icon guidelines, that should be followed to keep quality and consistency when making icons for Lucide.

Read it here: [ICON_GUIDELINES](/docs/icon-design-guide.md).

### Editor guides

Here you can find instructions on how to implement the guidelines with different vector graphics editors:

#### [Adobe Illustrator Guide](/docs/illustrator-guide.md)

You can also [download an Adobe Illustrator template](/docs/templates/illustrator-template.ai).

#### [Inkscape Guide](/docs/inkscape-guide.md)

#### [Figma Guide](/docs/figma-guide.md)

### Submitting Multiple Icons

If you want submit multiple icons, please separate the icons and group them. That makes reviewing the icons easier and keep the thread clean and scoped.
So don't submit multiple icons in one PR that have noting to do with each other.
So for example don't create one PR with icons: `arrow-up`, `bicycle`, `arrow-down`.
Seperate them by two PRs; 'pr-01' `arrow`, `arrow-down` and 'pr-02' `bicycle`.

## Icon Requests

Before creating an icon request, please search to see if someone has requested the icon already. If there is an open request, please add a :+1:.

If the icon has not already been requested, [create an issue](https://github.com/lucide-icons/lucide/issues/new?title=Icon%20Request:) with a title of `Icon request: <icon name>` and add as much information as possible.

### Icon Requests from Feather

If you are a designer who wants to contribute to Lucide but you don't know what icons to work on, then have a look at the Requests from Feather. All open, unfinished and valid requests can be found in [Feather Icon Requests](https://github.com/lucide-icons/lucide/issues/119).

## Development

You will need minimum version of [Nodejs 16.4+](https://nodejs.org)
For package management you will need [PNPM](https://pnpm.io/installation).
For flutter package development, you need [Flutter 1.17+](https://docs.flutter.dev/get-started/install).

After cloning the project you need to run:

```sh
pnpm install # Install dependencies, including the workspace packages
```

### Packages -> PNPM Workspaces

To distribute different packages we use PNPM workspaces. Before you start make sure you are familiar with this concept. The concept of working in workspaces is created by Yarn, they have a well written introduction: [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces).

The configured directory for workspaces is the [packages](./packages) directory, located in the root directory. There you will find all the current packages from lucide.
There are more workspaces defined, see [`pnpm-workspace.yaml`](./pnpm-workspace.yaml).

> Note: One package is not managed by pnpm:  **lucide-flutter**, this package is written in Dart and used pub for publishing.

### Generated Code

For icons we use one single source of truth the icons svgs located in the icons directory. To distribute icons to the packages we generate code including: icon files with svg paths, index files with imports, and types files. Depending on the use case other necessary code will be generated.

The commands for generating this code you will read in the next chapter.

### Commonly used scripts

#### Building

The build script includes multiple subcommands to: clean the dist directory, generate icon files, generate types files, and build/transpile code for each build format.

```sh
pnpm [package-name] build

#example:

pnpm lucide-react build
```

#### Testing

Run unit tests with jest for each package to make sure all the package apis still works as expected.

```sh
pnpm [package-name] test

#example:

pnpm lucide-vue test
```

Recommended to run the test watcher when making changes.

```sh
pnpm [package-name] test:watch

#example:

pnpm lucide-preact test:watch
```

### Unit Testing

When adding new features to for example the icon component for a framework. It is required to have this covered with some unit tests.

### Local Testing

To test changes in a local project, you can use `yarn link`, `npm link` or `pnpm link` to link the package. Before you do this make sure you builded the package first.

```sh
# in packages/lucide-react

npm run build &&
npm link

# in your local project

npm link lucide-react
```

## Project Structure

Root directories

```sh
lucide
|
├── docs
├── icons
├── packages
├── scripts
└── site
```

### Docs

Detailed documentation about: installation, guides, packages, design guides etc.

### Icons

All the icons of lucide in SVG format. These will be used as source for all the packages and other distributions for the lucide icons.

### packages

Includes all the (npm) packages of lucide.

> Note: One package is not managed by pnpm:  **lucide-flutter**, this package is written in Dart and used pub for publishing.

### scripts

Includes usefully scripts to automate certain jobs. Big part of the scripts is the template generation, for example it generates icon components  for all the packages. These scripts are usually executed from the "scripts" section in the package.json.

### site

The lucide.dev website using [Nextjs](https://nextjs.org).

## Documentation

The documentation files are located in the [docs](./docs) directory. All these markdown files will be loaded in the build of the lucide.dev website.

Feel free to write, adjust or add new markdown files to improve our documentation.

## Support

If you need any help or have problems with you contribution. Please don't hesitate to contact the Lucide Community, you can find us on [Github](https://github.com/lucide-icons/lucide) and [Discord](https://discord.gg/EH6nSts).

## Credits

Thank you to all the people who already contributed to Lucide!

<a href="https://github.com/lucide-icons/lucide/graphs/contributors">
<img src="https://opencollective.com/lucide-icons/contributors.svg?width=890" /></a>
