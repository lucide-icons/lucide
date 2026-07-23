import { HeadConfig } from 'vitepress';

const getHeadConfig = ({
  title,
  description,
  socialTitle,
}: {
  title: string;
  description: string;
  socialTitle?: string;
}): HeadConfig[] => [
  [
    'link',
    {
      rel: 'preconnect',
      href: 'https://analytics.lucide.dev',
    },
  ],
  [
    'script',
    {
      src: 'https://analytics.lucide.dev/js/script.js',
      'data-domain': 'lucide.dev',
      defer: '',
    },
  ],
  [
    'meta',
    {
      property: 'og:locale',
      content: 'en_US',
    },
  ],
  [
    'meta',
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  [
    'meta',
    {
      property: 'og:site_name',
      content: title,
    },
  ],
  [
    'meta',
    {
      property: 'og:title',
      content: socialTitle,
    },
  ],
  [
    'meta',
    {
      property: 'og:description',
      content: description,
    },
  ],
  [
    'meta',
    {
      property: 'og:url',
      content: 'https://lucide.dev',
    },
  ],
  [
    'meta',
    {
      property: 'og:image',
      content: 'https://lucide.dev/og.png',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:width',
      content: '1200',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:height',
      content: '630',
    },
  ],
  [
    'meta',
    {
      property: 'og:image:type',
      content: 'image/png',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  [
    'meta',
    {
      property: 'twitter:title',
      content: socialTitle,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:description',
      content: description,
    },
  ],
  [
    'meta',
    {
      property: 'twitter:image',
      content: 'https://lucide.dev/og.png',
    },
  ],
];

export default getHeadConfig;
