# With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

While they aren't provided as standalone components, they can be still be passed to the `LucideIcon` component the same way as official icons:

```html
<!-- Directly as LucideIconData: -->
<svg [lucideIcon]="CoconutIcon"></svg>

<!-- As a provided icon by name: -->
<svg lucideIcon="coconut"></svg>
```

```ts{2,6-7,11-12}
import { provideLucideIcons } from '@lucide/angular';
import { coconut } from '@lucide/lab';

@Component({
  templateUrl: './foobar.html',
  // For using by name via provider:
  providers: [provideLucideIcons({ coconut })],
  imports: [LucideIcon]
})
export class Foobar {
  // For passing directly as LucideIconData:
  readonly CoconutIcon = coconut;
}
```
