# Lucide React

import React from 'react';
import { ArrowDownIcon, ThermometerIcon, FlaskConicalIcon, MountainIcon } from 'lucide-react';

export default function A1BowenSeriesPoster() {
  return (
    <div className="relative flex flex-col items-center bg-gradient-to-b from-slate-900 to-blue-900 text-white p-12 h-[120cm] w-[80cm]" style={{aspectRatio: '80/120'}}>
      <div className="absolute top-4 right-4 text-sm text-gray-400">
        Ukuran A1: 80cm × 120cm
      </div>
      
      <header className="text-center mb-12 w-full">
        <h1 className="text-7xl font-bold text-yellow-400 mb-6">Pembentukan Mineral</h1>
        <h2 className="text-6xl font-semibold text-yellow-300 mb-4">Berdasarkan Deret Bowen</h2>
        <p className="text-3xl text-yellow-200">Urutan Kristalisasi Magma dan Evolusi Mineral</p>
      </header>

      <div className="grid grid-cols-2 gap-8 w-full flex-grow">
        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-semibold mb-8 text-blue-400 flex items-center">
            <ThermometerIcon className="mr-4 h-12 w-12" /> Seri Diskontinu
          </h2>
          <div className="space-y-8 w-full">
            {[
              {
                temp: "1200°C",
                mineral: "Olivin",
                formula: "(Mg,Fe)₂SiO₄",
                characteristics: "• Mineral mafik\n• Berwarna hijau gelap\n• Terbentuk paling awal\n• Densitas tinggi"
              },
              {
                temp: "1100°C",
                mineral: "Piroksen",
                formula: "(Ca,Mg,Fe)Si₂O₆",
                characteristics: "• Mineral silikat rantai tunggal\n• Warna hitam-hijau\n• Bentuk kristal prismatik\n• Belahan 90°"
              },
              {
                temp: "1000°C",
                mineral: "Amfibol",
                formula: "Ca₂(Mg,Fe)₅Si₈O₂₂(OH)₂",
                characteristics: "• Silikat rantai ganda\n• Mengandung OH\n• Bentuk prismatik memanjang\n• Belahan 56° dan 124°"
              },
              {
                temp: "900°C",
                mineral: "Biotit",
                formula: "K(Mg,Fe)₃AlSi₃O₁₀(OH)₂",
                characteristics: "• Mika hitam\n• Struktur lembaran\n• Dapat dibelah sangat tipis\n• Mengkilap"
              }
            ].map(item => (
              <div className="bg-gradient-to-r from-orange-900 to-orange-800 p-6 rounded-lg w-full">
                <div className="text-4xl font-bold mb-2">{item.mineral}</div>
                <div className="text-2xl text-orange-200 mb-2">Suhu: {item.temp}</div>
                <div className="text-xl font-mono mb-4">{item.formula}</div>
                <div className="text-xl whitespace-pre-line">{item.characteristics}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-5xl font-semibold mb-8 text-red-400 flex items-center">
            <FlaskConicalIcon className="mr-4 h-12 w-12" /> Seri Kontinu
          </h2>
          <div className="space-y-8 w-full">
            <div className="bg-gradient-to-r from-red-900 to-red-800 p-6 rounded-lg w-full">
              <div className="text-4xl font-bold mb-4">Plagioklas (Ca → Na)</div>
              <div className="text-2xl text-red-200 mb-4">Suhu: 1200°C → 900°C</div>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-semibold">Anortit (Ca)</div>
                  <div className="text-xl font-mono mb-2">CaAl₂Si₂O₈</div>
                  <ul className="text-xl">
                    <li>• Plagioklas kaya kalsium</li>
                    <li>• Terbentuk pada suhu tinggi</li>
                    <li>• Berwarna putih ke abu-abu</li>
                    <li>• Lebih resisten terhadap pelapukan</li>
                  </ul>
                </div>
                <ArrowDownIcon className="mx-auto h-12 w-12 text-red-400" />
                <div>
                  <div className="text-3xl font-semibold">Albit (Na)</div>
                  <div className="text-xl font-mono mb-2">NaAlSi₃O₈</div>
                  <ul className="text-xl">
                    <li>• Plagioklas kaya natrium</li>
                    <li>• Terbentuk pada suhu lebih rendah</li>
                    <li>• Berwarna putih</li>
                    <li>• Kurang resisten terhadap pelapukan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-5xl font-semibold mb-8 text-purple-400 flex items-center justify-center">
          <MountainIcon className="mr-4 h-12 w-12" /> Mineral Akhir
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              mineral: "K-Feldspar",
              temp: "800-700°C",
              formula: "KAlSi₃O₈",
              characteristics: "• Mineral felsik\n• Warna merah muda/putih\n• Sistem kristal monoklinik\n• Belahan sempurna 90°"
            },
            {
              mineral: "Muskovit",
              temp: "700-600°C",
              formula: "KAl₂(AlSi₃O₁₀)(OH)₂",
              characteristics: "• Mika putih\n• Transparan dalam lapisan tipis\n• Struktur berlapis\n• Kilap mutiara"
            },
            {
              mineral: "Kuarsa",
              temp: "600°C",
              formula: "SiO₂",
              characteristics: "• Paling resisten terhadap pelapukan\n• Kekerasan 7 (skala Mohs)\n• Tidak memiliki belahan\n• Kilap kaca"
            }
          ].map(item => (
            <div className="bg-gradient-to-r from-purple-900 to-purple-800 p-6 rounded-lg">
              <div className="text-4xl font-bold mb-2">{item.mineral}</div>
              <div className="text-2xl text-purple-200 mb-2">Suhu: {item.temp}</div>
              <div className="text-xl font-mono mb-4">{item.formula}</div>
              <div className="text-xl whitespace-pre-line">{item.characteristics}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-12 text-center w-full">
        <h3 className="text-4xl font-semibold mb-6 text-yellow-400">Implikasi Geologi</h3>
        <div className="grid grid-cols-2 gap-8 text-2xl">
          <ul className="space-y-4">
            <li>• Mineral yang terbentuk awal kaya akan Fe, Mg, dan Ca</li>
            <li>• Menentukan tekstur dan komposisi batuan beku</li>
          </ul>
          <ul className="space-y-4">
            <li>• Seiring penurunan suhu, mineral menjadi lebih kaya Si, K, dan Na</li>
            <li>• Membantu memahami diferensiasi magma dan evolusi batuan</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}Implementation of the lucide icon library for react applications

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-react
```

```sh [yarn]
yarn add lucide-react
```

```sh [npm]
npm install lucide-react
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a React component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Camera } from 'lucide-react';

// Usage
const App = () => {
  return <Camera color="red" size={48} />;
};

export default App;
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return <Camera size={48} fill="red" />;
};
```

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like regular lucide icons can be passed to adjust the icon appearance.

### Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```jsx
import { Icon } from 'lucide-react';
import { burger } from '@lucide/lab';

const App = () => (
  <Icon iconNode={burger} />
);
```

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important to keep in mind when using bundlers like `Webpack`, `Rollup`, or `Vite`.

This is not the case for the latest NextJS, because it uses server side rendering. The icons will be streamed to the client when needed. For NextJS with Dynamic Imports, see [dynamic imports](#nextjs-example) section for more information.
:::

### Icon Component Example

```jsx
import { icons } from 'lucide-react';

const Icon = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
```

#### Using the Icon Component

```jsx
import Icon from './Icon';

const App = () => {
  return <Icon name="Home" />;
};

export default App;
```

#### With Dynamic Imports

Lucide react exports a dynamic import map `dynamicIconImports`, which is useful for applications that want to show icons dynamically by icon name. For example, when using a content management system with where icon names are stored in a database.

When using client side rendering, it will fetch the icon component when it's needed. This will reduce the initial bundle size.

The keys of the dynamic import map are the lucide original icon names (kebab case).

Example with React suspense:

```tsx
import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }}/>

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
}

export default Icon
```

##### NextJS Example

In NextJS, [the dynamic function](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) can be used to dynamically load the icon component.

To make dynamic imports work with NextJS, you need to add `lucide-react` to the [`transpilePackages`](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages) option in your `next.config.js` like this:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'] // add this
}

module.exports = nextConfig

```

You can then start using it:

```tsx
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon {...props} />;
};

export default Icon;
```
