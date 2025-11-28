# TypeScript Support

List of exported types from the `lucide-preact` package.
These can be used to type your components when using Lucide icons in a TypeScript React project

## `LucideProps`

Exports all props that can be passed to an icon component and any other SVG attributes, see: [SVG Presentation Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```ts
interface LucideProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  [key: string]: any; // Any other SVG attributes
}
```

### Using `LucideProps`
You can use the `LucideProps` interface to type your custom icon components or when you need to work with icon props.

```tsx
import { type LucideProps } from 'lucide-preact';
import { Camera } from 'lucide-preact';

const WrapIcon = (props: LucideProps) => {
  return <Camera {...props} />;
};

export default WrapIcon;
```

## `LucideIcon`

Type for individual icon components.

```ts
type LucideIcon = React.FC<LucideProps>;
```

### Using `LucideIcon`

You can use the `LucideIcon` type when you need to work with icon components directly.

```tsx
import { type LucideIcon } from 'lucide-preact';

interface ButtonProps {
  icon: LucideIcon;
  label: string;
}

const IconButton = ({ icon: Icon, label }: ButtonProps) => {
  return (
    <button aria-label={label}>
      <Icon size={16} />
    </button>
  );
};

export default IconButton;
```

## `IconNode`

Type for the raw SVG structure of an icon. This is an array of SVG elements and their attributes to render the icon.
Not commonly used directly in application code. But can be useful for advanced use cases, such as using custom icons or with Lucide lab.

```ts
type IconNode = [elementName: string, attrs: Record<string, string | number>][];
```

### Using `IconNode`
You can use the `IconNode` type when you need to work with the raw SVG structure of an icon.

```tsx
import { type IconNode, Icon } from 'lucide-preact';

const customIcon: IconNode = [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
  ['line', { x1: 12, y1: 16, x2: 12, y2: 16 }],
];

const MyCustomIcon = () => {
  return (
    <Icon iconNode={customIcon} size={24} color="blue" />
  );
};

export default MyCustomIcon;
```
