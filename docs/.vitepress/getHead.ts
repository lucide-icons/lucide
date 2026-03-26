import { HeadConfig } from "vitepress"

interface GetHeadOptions {
  title: string;
  socialTitle: string;
  description: string;
}

const brandColor = '#f56565'

const getHead = ({ title, socialTitle, description }: GetHeadOptions): HeadConfig[] => [
  // Favicons and meta tags
    [
      'meta',
      {
        name: 'robots',
        content: 'index,follow',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: brandColor,
      },
    ],
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
        sizes: '32x32',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16x16.png',
        sizes: '16x16',
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: brandColor,
      },
    ],
    // Analytics
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
    // Open Graph and Twitter Card meta tags
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
        property: 'og:image:alt',
        content: 'Lucide icon library preview image',
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
        property: 'twitter:site',
        content: '@lucide_icons',
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
]

export default getHead
