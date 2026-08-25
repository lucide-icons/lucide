export const resourcesSidebar = [
  {
    text: 'About',
    items: [
      {
        text: 'License',
        link: '/license',
      },
      {
        text: 'Community',
        link: '/community',
      },
      {
        text: 'Code of conduct',
        link: '/code-of-conduct',
      },
      {
        text: 'Brand logo statement',
        link: '/brand-logo-statement',
      },
    ],
  },
  {
    text: 'Contribute',
    items: [
      {
        text: 'Contribution guide',
        link: '/contribute/',
      },
    ],
  },
  {
    text: 'Contributing icons',
    items: [
      {
        text: 'Getting started',
        link: '/contribute/icons/',
      },
      {
        text: 'Design language',
        link: '/contribute/icons/design-principles',
        desc: 'Learn the visual rules that make Lucide icons consistent and recognizable.',
      },
      {
        text: 'Design specification',
        link: '/contribute/icons/specification',
        desc: 'Review the rules Lucide icons must follow.',
      },
      {
        text: 'Naming conventions',
        link: '/contribute/icons/naming-conventions',
        desc: 'Learn how to choose clear, consistent, and predictable names for Lucide icons.',
      },
      {
        text: 'Metadata conventions',
        link: '/contribute/icons/metadata-conventions',
        desc: 'Learn how to write use cases, tags, categories, aliases, and other icon metadata.',
        items: [
          {
            text: 'Use case guide',
            link: '/contribute/icons/metadata-conventions/use-case-guide',
            desc: '',
          },
          {
            text: 'Tag guide',
            link: '/contribute/icons/metadata-conventions/tag-guide',
            desc: '',
          },
        ],
      },
      {
        text: 'SVG conventions',
        link: '/contribute/icons/code-conventions',
        desc: 'Learn how to structure and write Lucide SVG files.',
      },
      {
        text: 'Design software guides',
        collapsed: false,
        desc: 'Learn how to design and export Lucide icons with common vector tools.',
        items: [
          {
            text: 'Adobe Illustrator',
            link: '/contribute/icons/illustrator-guide',
            desc: '',
          },
          {
            text: 'Inkscape',
            link: '/contribute/icons/inkscape-guide',
          },
          {
            text: 'Figma',
            link: '/contribute/icons/figma-guide',
          },
          {
            text: 'Affinity Designer',
            link: '/contribute/icons/affinity-designer-guide',
          },
        ],
      },
    ],
  },
];
