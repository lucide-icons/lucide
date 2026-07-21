import { Component, input, inputBinding, signal, WritableSignal } from '@angular/core';
import { LucideDynamicIcon } from './lucide-dynamic-icon';
import { LucideIconData, LucideIconInput } from './types';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLucideIcons } from './lucide-icons';
import { LucideActivity } from './icons/activity';
import { By } from '@angular/platform-browser';

@Component({
  template: `@if (icon(); as iconData) {
    <svg [lucideIcon]="iconData">
      <rect x="1" y="1" width="22" height="22" />
    </svg>
  }`,
  imports: [LucideDynamicIcon],
})
class TestHostComponent {
  readonly icon = input<LucideIconData>();
}

describe('LucideDynamicIcon', () => {
  let component: LucideDynamicIcon;
  let fixture: ComponentFixture<LucideDynamicIcon>;
  let icon: WritableSignal<LucideIconInput | null | undefined>;
  const expectSvgClasses = (classes: string[]) => {
    for (const cssClass of classes) {
      expect(fixture.nativeElement.classList.contains(cssClass)).toBe(true);
    }
  };
  const getRenderedChildren = () => Array.from(fixture.nativeElement.children) as Element[];
  const testIcon: LucideIconData = {
    name: 'demo',
    node: [['polyline', { points: '1 1 22 22' }]],
  };
  const testIcon2: LucideIconData = {
    name: 'demo-other',
    node: [
      ['circle', { cx: 12, cy: 12, r: 8, fill: 'currentColor' }],
      ['polyline', { points: '1 1 22 22' }],
    ],
    aliases: ['demo-2'],
  };
  const supportedShapesIcon: LucideIconData = {
    name: 'supported-shapes',
    node: [
      ['path', { d: 'm1 1 2 2', fill: 'currentColor', key: 'path-key' }],
      ['line', { x1: 1, x2: 2, y1: 3, y2: 4, key: 'line-key' }],
      ['polygon', { points: '1 1 2 2 3 1', key: 'polygon-key' }],
      ['polyline', { points: '1 1 2 2 3 1', key: 'polyline-key' }],
      ['circle', { cx: 12, cy: 12, r: 8, fill: 'currentColor', key: 'circle-key' }],
      ['ellipse', { cx: 12, cy: 12, rx: 8, ry: 4, key: 'ellipse-key' }],
      ['rect', { x: 1, y: 2, width: 3, height: 4, rx: 5, ry: 6, key: 'rect-key' }],
    ],
  };
  const fillAndStrokeAttrs = {
    fill: 'red',
    'fill-opacity': '0.5',
    stroke: 'blue',
    'stroke-width': '3',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'bevel',
    'stroke-dasharray': '4 2',
    'stroke-dashoffset': '1',
    opacity: '0.75',
  };
  const strokeOnlyAttrs = {
    stroke: 'blue',
    'stroke-width': '3',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'bevel',
    'stroke-dasharray': '4 2',
    'stroke-dashoffset': '1',
    opacity: '0.75',
  };
  const presentationAttrsIcon: LucideIconData = {
    name: 'presentation-attrs',
    node: [
      ['path', { d: 'm1 1 2 2', ...fillAndStrokeAttrs }],
      ['line', { x1: 1, x2: 2, y1: 3, y2: 4, ...strokeOnlyAttrs }],
      ['polygon', { points: '1 1 2 2 3 1', ...fillAndStrokeAttrs }],
      ['polyline', { points: '1 1 2 2 3 1', ...fillAndStrokeAttrs }],
      ['circle', { cx: 12, cy: 12, r: 8, ...fillAndStrokeAttrs }],
      ['ellipse', { cx: 12, cy: 12, rx: 8, ry: 4, ...fillAndStrokeAttrs }],
      ['rect', { x: 1, y: 2, width: 3, height: 4, rx: 5, ry: 6, ...fillAndStrokeAttrs }],
    ],
  };
  function createComponent() {
    return TestBed.createComponent(LucideDynamicIcon, {
      inferTagName: true,
      bindings: [inputBinding('lucideIcon', icon)],
    });
  }
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideLucideIcons(testIcon)],
    });
    icon = signal('demo');
    fixture = createComponent();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render children', () => {
    icon.set(testIcon2);
    fixture.detectChanges();
    const children = getRenderedChildren();
    expect(children.map((child) => child.tagName.toLowerCase())).toEqual(['circle', 'polyline']);
    expect(children[0].outerHTML).toBe(
      '<circle cx="12" cy="12" r="8" fill="currentColor"></circle>',
    );
    expect(children[1].outerHTML).toBe('<polyline points="1 1 22 22"></polyline>');
  });

  it('should render supported SVG shapes and attributes', () => {
    icon.set(supportedShapesIcon);
    fixture.detectChanges();
    const children = getRenderedChildren();
    expect(children.map((child) => child.outerHTML)).toEqual([
      '<path d="m1 1 2 2" fill="currentColor"></path>',
      '<line x1="1" x2="2" y1="3" y2="4"></line>',
      '<polygon points="1 1 2 2 3 1"></polygon>',
      '<polyline points="1 1 2 2 3 1"></polyline>',
      '<circle cx="12" cy="12" r="8" fill="currentColor"></circle>',
      '<ellipse cx="12" cy="12" rx="8" ry="4"></ellipse>',
      '<rect x="1" y="2" width="3" height="4" rx="5" ry="6"></rect>',
    ]);
  });

  it('should render stroke and fill presentation attributes on all supported shapes', () => {
    icon.set(presentationAttrsIcon);
    fixture.detectChanges();
    const children = getRenderedChildren();
    expect(children.map((child) => child.outerHTML)).toEqual([
      '<path d="m1 1 2 2" fill="red" fill-opacity="0.5" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></path>',
      '<line x1="1" x2="2" y1="3" y2="4" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></line>',
      '<polygon points="1 1 2 2 3 1" fill="red" fill-opacity="0.5" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></polygon>',
      '<polyline points="1 1 2 2 3 1" fill="red" fill-opacity="0.5" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></polyline>',
      '<circle cx="12" cy="12" r="8" fill="red" fill-opacity="0.5" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></circle>',
      '<ellipse cx="12" cy="12" rx="8" ry="4" fill="red" fill-opacity="0.5" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></ellipse>',
      '<rect x="1" y="2" width="3" height="4" rx="5" ry="6" fill="red" fill-opacity="0.5" stroke="blue" stroke-width="3" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="4 2" stroke-dashoffset="1" opacity="0.75"></rect>',
    ]);
  });

  it('should remove children on change', () => {
    icon.set(null);
    fixture.detectChanges();
    expect(getRenderedChildren()).toEqual([]);
  });

  describe('iconInput', () => {
    it('should support LucideIconData input', () => {
      icon.set(testIcon);
      fixture.detectChanges();
      expect(component['icon']()).toBe(testIcon);
      expect(getRenderedChildren().map((child) => child.outerHTML)).toEqual([
        '<polyline points="1 1 22 22"></polyline>',
      ]);
    });
    it('should support LucideIcon input', () => {
      icon.set(LucideActivity);
      fixture.detectChanges();
      expect(component['icon']()).toBe(LucideActivity.icon);
    });
    it('should support string icon name', () => {
      icon.set('demo');
      fixture.detectChanges();
      expect(component['icon']()).toBe(testIcon);
    });
    it('should throw error if no icon found', () => {
      icon.set('invalid');
      expect(() => fixture.detectChanges()).toThrowError(`Unable to resolve icon 'invalid'`);
    });
  });

  describe('class', () => {
    it('should add all classes', () => {
      fixture.detectChanges();
      expectSvgClasses(['lucide', 'lucide-demo']);
    });
    it('should add backwards compatible classes from aliases', () => {
      icon.set(testIcon2);
      fixture.detectChanges();
      expectSvgClasses(['lucide', 'lucide-demo-other', 'lucide-demo-2']);
    });
    it('should add class icon if available', () => {
      icon.set(LucideActivity);
      fixture.detectChanges();

      expectSvgClasses(['lucide', 'lucide-activity']);
    });
    it('should remove class on change', () => {
      icon.set(null);
      fixture.detectChanges();
      expectSvgClasses(['lucide']);
      expect(fixture.nativeElement.classList.contains('lucide-demo')).toBe(false);
    });
  });

  describe('content projection', () => {
    it('should project content', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.componentRef.setInput('icon', testIcon);
      hostFixture.detectChanges();
      hostFixture.componentRef.setInput('icon', testIcon2);
      hostFixture.detectChanges();
      const rect = hostFixture.debugElement.query(By.css('svg :last-child')).nativeElement;
      expect(rect).toBeInstanceOf(SVGElement);
      expect(rect.outerHTML).toBe('<rect x="1" y="1" width="22" height="22"></rect>');
    });
  });
});
