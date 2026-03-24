/**
 * @internal
 * The template of all Lucide icon components.
 */
export const lucideIconTemplate = `@if (title(); as titleValue) {
  <title>{{ titleValue }}</title>
}
<ng-content select="title"></ng-content>
<ng-container #contentRef></ng-container>
<ng-content />`;
