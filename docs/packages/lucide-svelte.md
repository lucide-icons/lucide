# Lucide Svelte

Implementation of the lucide icon library for svelte applications.

## Installation

```bash
yarn add lucide-svelte
```

or

```sh
npm install lucide-svelte
```

## How to use

All the icons are Svelte components, that ouputs Svg elements. So each icon can be imported and used as a component. This also helps with the use of threeshaking so you only import the icons you use.

### Example

Default usage:

```html
<script>
  import { Skull } from 'lucide-svelte';
</script>

<Skull />
```

You can pass additional props to adjust the icon.

```html
<script>
  import { Camera } from 'lucide-svelte';
</script>

<Camera color="#ff3e98" />
```

### Available props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |
| `*<SVGProps>`         | *string*  | -            |


\* All SVGProps are available to style the svgs. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation)

### Example of custom props

```html
<script>
  import { Phone } from 'lucide-svelte';
</script>

<Phone fill="#333" />
```

This results a filled phone icon.

### One generic icon component

It is possible to create one generic icon component to load icons.

> ⚠️ Example below importing all EsModules, caution using this example, not recommended when you bundle your application,the build size will grow strongly. Because it will import all the icons.

#### Icon Component Example

```html
<script>
  import * as icons from 'lucide-svelte';
  export let name;
</script>

<svelte:component this="{icons[name]}" {...$$props} />
```

##### Then you can use it like this

```html
<script>
  import LucideIcon from './LucideIcon';
</script>

<LucideIcon name="Menu" />
```
