export default {
  async load() {
    return {
      packages: [
        {
          name: 'lucide',
          logo: '/framework-logos/js.svg',
          label: 'Lucide documentation for JavaScript',
          path: '/guide/lucide/',
        },
        {
          name: 'lucide-react',
          logo: '/framework-logos/react.svg',
          label: 'Lucide documentation for React',
          path: '/guide/react/',
        },
        {
          name: 'lucide-vue',
          logo: '/framework-logos/vue.svg',
          label: 'Lucide documentation for Vue',
          path: '/guide/vue/',
        },
        {
          name: 'lucide-svelte',
          logo: '/framework-logos/svelte.svg',
          label: 'Lucide documentation for Svelte',
          path: '/guide/svelte/',
        },
        {
          name: 'lucide-solid',
          logo: '/framework-logos/solid.svg',
          label: 'Lucide documentation for Solid',
          path: '/guide/solid/',
        },
        {
          name: 'lucide-preact',
          logo: '/framework-logos/preact.svg',
          label: 'Lucide documentation for Preact',
          path: '/guide/preact/',
        },
        {
          name: 'angular',
          logo: '/framework-logos/angular.svg',
          label: 'Lucide documentation for Angular',
          path: '/guide/angular/',
        },
        {
          name: 'lucide-astro',
          logo: '/framework-logos/astro.svg',
          logoDark: '/framework-logos/astro-dark.svg',
          label: 'Lucide documentation for Astro',
          path: '/guide/astro/',
        },
        {
          name: 'lucide-react-native',
          logo: '/framework-logos/react-native.svg',
          label: 'Lucide documentation for React Native',
          path: '/guide/react-native/',
        },
      ],
    };
  },
};
