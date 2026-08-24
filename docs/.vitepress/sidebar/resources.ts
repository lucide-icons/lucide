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
        text: 'Code of Conduct',
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
        text: 'Design Language',
        link: '/contribute/icons/design-principles',
        desc: 'Learn the visual principles that make Lucide icons consistent and recognizable.',
      },
      {
        text: 'Design Specification',
        link: '/contribute/icons/specification',
        desc: 'Reference the concrete requirements that Lucide icons must or should follow.',
      },
      {
        text: 'Naming conventions',
        link: '/contribute/icons/naming-conventions',
        desc: 'Learn how to choose clear, consistent, and predictable names for Lucide icons.',
      },
      {
        text: 'Metadata conventions',
        link: '/contribute/icons/metadata-conventions',
        desc: 'Learn how to write tags, categories, aliases, and other metadata for Lucide icons.',
      },
      {
        text: 'SVG conventions',
        link: '/contribute/icons/code-conventions',
        desc: 'Learn how SVG files should be structured and written for the Lucide repository.',
      },
      {
        text: 'Design software guides',
        collapsed: false,
        desc: 'Learn how to design and export Lucide icons using common vector design tools.',
        items: [{
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
          }
        ],
      },
    ],
  },
];
