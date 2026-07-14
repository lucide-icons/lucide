/**
 * @internal
 * The template of all Lucide icon components.
 */
export const lucideIconTemplate = `@if (title(); as titleValue) {
  <title>{{ titleValue }}</title>
}
<ng-content select="title"></ng-content>
@for (child of computedIconNode(); track child[1]['key'] ?? $index) {
  @let attrs = child[1];
  @switch (child[0]) {
    @case ('path') {
      <svg:path
        [attr.d]="attrs['d']"
        [attr.fill]="attrs['fill']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('line') {
      <svg:line
        [attr.x1]="attrs['x1']"
        [attr.x2]="attrs['x2']"
        [attr.y1]="attrs['y1']"
        [attr.y2]="attrs['y2']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('polygon') {
      <svg:polygon
        [attr.points]="attrs['points']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('polyline') {
      <svg:polyline
        [attr.points]="attrs['points']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('circle') {
      <svg:circle
        [attr.cx]="attrs['cx']"
        [attr.cy]="attrs['cy']"
        [attr.r]="attrs['r']"
        [attr.fill]="attrs['fill']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('ellipse') {
      <svg:ellipse
        [attr.cx]="attrs['cx']"
        [attr.cy]="attrs['cy']"
        [attr.rx]="attrs['rx']"
        [attr.ry]="attrs['ry']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('rect') {
      <svg:rect
        [attr.x]="attrs['x']"
        [attr.y]="attrs['y']"
        [attr.width]="attrs['width']"
        [attr.height]="attrs['height']"
        [attr.rx]="attrs['rx']"
        [attr.ry]="attrs['ry']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
  }
}
<ng-content />`;
