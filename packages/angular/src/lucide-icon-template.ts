/**
 * @internal
 * The template of all Lucide icon components.
 */
export const lucideIconTemplate = `@if (title(); as titleValue) {
  <title>{{ titleValue }}</title>
}
<ng-content select="title"></ng-content>
@for (child of iconNodes(); track child[1]['key'] ?? $index) {
  @let attrs = child[1];
  @switch (child[0]) {
    @case ('path') {
      <svg:path
        [attr.class]="attrs['class']"
        [attr.d]="attrs['d']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('line') {
      <svg:line
        [attr.class]="attrs['class']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.x1]="attrs['x1']"
        [attr.x2]="attrs['x2']"
        [attr.y1]="attrs['y1']"
        [attr.y2]="attrs['y2']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('polygon') {
      <svg:polygon
        [attr.class]="attrs['class']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.points]="attrs['points']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('polyline') {
      <svg:polyline
        [attr.class]="attrs['class']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.points]="attrs['points']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('circle') {
      <svg:circle
        [attr.class]="attrs['class']"
        [attr.cx]="attrs['cx']"
        [attr.cy]="attrs['cy']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.r]="attrs['r']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('ellipse') {
      <svg:ellipse
        [attr.class]="attrs['class']"
        [attr.cx]="attrs['cx']"
        [attr.cy]="attrs['cy']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.rx]="attrs['rx']"
        [attr.ry]="attrs['ry']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
    @case ('rect') {
      <svg:rect
        [attr.class]="attrs['class']"
        [attr.x]="attrs['x']"
        [attr.y]="attrs['y']"
        [attr.id]="attrs['id']"
        [attr.opacity]="attrs['opacity']"
        [attr.width]="attrs['width']"
        [attr.height]="attrs['height']"
        [attr.rx]="attrs['rx']"
        [attr.ry]="attrs['ry']"
        [attr.stroke]="attrs['stroke']"
        [attr.stroke-opacity]="attrs['stroke-opacity']"
        [attr.fill]="attrs['fill']"
        [attr.fill-opacity]="attrs['fill-opacity']"
        [attr.vector-effect]="attrs['vector-effect']"
      />
    }
  }
}
<ng-content />`;
