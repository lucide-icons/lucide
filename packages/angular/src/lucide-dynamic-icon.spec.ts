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
      [
        'path',
        {
          class: 'path-class',
          d: 'm1 1 2 2',
          id: 'path-id',
          opacity: '0.7',
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          'vector-effect': 'non-scaling-stroke',
          key: 'path-key',
        },
      ],
      [
        'line',
        {
          class: 'line-class',
          id: 'line-id',
          opacity: '0.7',
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          x1: 1,
          x2: 2,
          y1: 3,
          y2: 4,
          'vector-effect': 'non-scaling-stroke',
          key: 'line-key',
        },
      ],
      [
        'polygon',
        {
          class: 'polygon-class',
          id: 'polygon-id',
          opacity: '0.7',
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          points: '1 1 2 2 3 1',
          'vector-effect': 'non-scaling-stroke',
          key: 'polygon-key',
        },
      ],
      [
        'polyline',
        {
          class: 'polyline-class',
          id: 'polyline-id',
          opacity: '0.7',
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          points: '1 1 2 2 3 1',
          'vector-effect': 'non-scaling-stroke',
          key: 'polyline-key',
        },
      ],
      [
        'circle',
        {
          class: 'circle-class',
          cx: 12,
          cy: 12,
          id: 'circle-id',
          opacity: '0.7',
          r: 8,
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          'vector-effect': 'non-scaling-stroke',
          key: 'circle-key',
        },
      ],
      [
        'ellipse',
        {
          class: 'ellipse-class',
          cx: 12,
          cy: 12,
          id: 'ellipse-id',
          opacity: '0.7',
          rx: 8,
          ry: 4,
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          'vector-effect': 'non-scaling-stroke',
          key: 'ellipse-key',
        },
      ],
      [
        'rect',
        {
          class: 'rect-class',
          x: 1,
          y: 2,
          id: 'rect-id',
          opacity: '0.7',
          width: 3,
          height: 4,
          rx: 5,
          ry: 6,
          stroke: 'red',
          'stroke-opacity': '0.5',
          fill: 'blue',
          'fill-opacity': '0.3',
          'vector-effect': 'non-scaling-stroke',
          key: 'rect-key',
        },
      ],
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
      '<path class="path-class" d="m1 1 2 2" id="path-id" opacity="0.7" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" vector-effect="non-scaling-stroke"></path>',
      '<line class="line-class" id="line-id" opacity="0.7" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" x1="1" x2="2" y1="3" y2="4" vector-effect="non-scaling-stroke"></line>',
      '<polygon class="polygon-class" id="polygon-id" opacity="0.7" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" points="1 1 2 2 3 1" vector-effect="non-scaling-stroke"></polygon>',
      '<polyline class="polyline-class" id="polyline-id" opacity="0.7" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" points="1 1 2 2 3 1" vector-effect="non-scaling-stroke"></polyline>',
      '<circle class="circle-class" cx="12" cy="12" id="circle-id" opacity="0.7" r="8" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" vector-effect="non-scaling-stroke"></circle>',
      '<ellipse class="ellipse-class" cx="12" cy="12" id="ellipse-id" opacity="0.7" rx="8" ry="4" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" vector-effect="non-scaling-stroke"></ellipse>',
      '<rect class="rect-class" x="1" y="2" id="rect-id" opacity="0.7" width="3" height="4" rx="5" ry="6" stroke="red" stroke-opacity="0.5" fill="blue" fill-opacity="0.3" vector-effect="non-scaling-stroke"></rect>',
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
