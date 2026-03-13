/**
 * @internal
 * The template of all Lucide icon components.
 */
export const lucideIconTemplate = `@if (title(); as titleValue) {
  <title>{{ titleValue }}</title>
}
<ng-content />`;
