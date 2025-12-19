import { Component, input, inputBinding, signal, WritableSignal } from '@angular/core';
import { LucideIcon } from './lucide-icon';
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
  imports: [LucideIcon],
})
class TestHostComponent {
  readonly icon = input<LucideIconData>();
}

describe('LucideIcon', () => {
  let component: LucideIcon;
  let fixture: ComponentFixture<LucideIcon>;
  let icon: WritableSignal<LucideIconInput | null | undefined>;
  let name: WritableSignal<string | undefined>;
  let title: WritableSignal<string | undefined>;
  let color: WritableSignal<string | undefined>;
  let size: WritableSignal<string | number | undefined>;
  let strokeWidth: WritableSignal<string | number | undefined>;
  let absoluteStrokeWidth: WritableSignal<boolean | undefined>;
  const getSvgAttribute = (attr: string) => fixture.nativeElement.getAttribute(attr);
  const testIcon: LucideIconData = [['polyline', { points: '1 1 22 22' }]];
  const testIcon2: LucideIconData = [
    ['circle', { cx: 12, cy: 12, r: 8 }],
    ['polyline', { points: '1 1 22 22' }],
  ];
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideLucideIcons({ demo: testIcon })],
    });
    icon = signal('demo');
    name = signal(undefined);
    title = signal(undefined);
    color = signal(undefined);
    size = signal(undefined);
    strokeWidth = signal(undefined);
    absoluteStrokeWidth = signal(undefined);
    fixture = TestBed.createComponent(LucideIcon, {
      inferTagName: true,
      bindings: [
        inputBinding('lucideIcon', icon),
        inputBinding('name', name),
        inputBinding('title', title),
        inputBinding('color', color),
        inputBinding('size', size),
        inputBinding('strokeWidth', strokeWidth),
        inputBinding('absoluteStrokeWidth', absoluteStrokeWidth),
      ],
    });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render children', () => {
    icon.set(testIcon2);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toBe(
      '<!--container--><circle cx="12" cy="12" r="8"></circle><polyline points="1 1 22 22"></polyline>',
    );
  });

  it('should remove children on change', () => {
    icon.set(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toBe('<!--container-->');
  });

  describe('iconInput', () => {
    it('should support LucideIconData input', () => {
      icon.set(testIcon);
      name.set('custom-name');
      fixture.detectChanges();

      expect(component['iconData']()).toBe(testIcon);
      expect(component['iconName']()).toBe('custom-name');
      expect(fixture.nativeElement.innerHTML).toBe(
        '<!--container--><polyline points="1 1 22 22"></polyline>',
      );
    });
    it('should support LucideIconComponentType input', () => {
      icon.set(LucideActivity);
      fixture.detectChanges();

      expect(component['iconData']()).toBe(LucideActivity.iconData);
      expect(component['iconName']()).toBe(LucideActivity.iconName);
    });
    it('should support string icon name', () => {
      icon.set('demo');
      fixture.detectChanges();

      expect(component['iconData']()).toBe(testIcon);
      expect(component['iconName']()).toBe('demo');
    });
    it('should throw error if no icon founds', () => {
      icon.set('invalid');
      expect(() => fixture.detectChanges()).toThrowError(`Unable to resolve icon 'invalid'`);
    });
  });

  describe('class', () => {
    it('should add all classes', () => {
      fixture.detectChanges();
      expect(getSvgAttribute('class')).toBe('lucide lucide-demo');
    });
    it('should add class from name, even if icon has name', () => {
      icon.set(LucideActivity);
      name.set('custom-name');
      fixture.detectChanges();

      expect(getSvgAttribute('class')).toBe('lucide lucide-custom-name');
    });
    it('should add class icon if available', () => {
      icon.set(LucideActivity);
      fixture.detectChanges();

      expect(getSvgAttribute('class')).toBe('lucide lucide-activity');
    });
    it('should remove class on change', () => {
      icon.set(null);
      fixture.detectChanges();
      expect(getSvgAttribute('class')).toBe('lucide');
    });
  });

  describe('color', () => {
    it('should default to currentColor', () => {
      fixture.detectChanges();
      expect(getSvgAttribute('stroke')).toBe('currentColor');
    });
    it('should set color', () => {
      color.set('red');
      fixture.detectChanges();
      expect(getSvgAttribute('stroke')).toBe('red');
    });
  });

  describe('size', () => {
    it('should default to 24', () => {
      fixture.detectChanges();
      expect(getSvgAttribute('width')).toBe('24');
      expect(getSvgAttribute('height')).toBe('24');
    });
    it('should set size', () => {
      size.set(12);
      fixture.detectChanges();
      expect(getSvgAttribute('width')).toBe('12');
      expect(getSvgAttribute('height')).toBe('12');
    });
    it('should allow string size', () => {
      size.set('18');
      fixture.detectChanges();
      expect(getSvgAttribute('width')).toBe('18');
      expect(getSvgAttribute('height')).toBe('18');
    });
    it('should use default on invalid string', () => {
      size.set('large');
      fixture.detectChanges();
      expect(getSvgAttribute('width')).toBe('24');
      expect(getSvgAttribute('height')).toBe('24');
    });
  });

  describe('strokeWidth', () => {
    it('should default to 2', () => {
      fixture.detectChanges();
      expect(getSvgAttribute('stroke-width')).toBe('2');
    });
    it('should set stroke width', () => {
      strokeWidth.set(1.41);
      fixture.detectChanges();
      expect(getSvgAttribute('stroke-width')).toBe('1.41');
    });
    it('should allow string stroke width', () => {
      strokeWidth.set('1px');
      fixture.detectChanges();
      expect(getSvgAttribute('stroke-width')).toBe('1');
    });
  });

  describe('absoluteStrokeWidth', () => {
    it('should not adjust stroke width', () => {
      strokeWidth.set(2);
      size.set(12);
      absoluteStrokeWidth.set(false);
      fixture.detectChanges();
      expect(getSvgAttribute('stroke-width')).toBe('2');
    });
    it('should adjust stroke width', () => {
      strokeWidth.set(2);
      size.set(12);
      absoluteStrokeWidth.set(true);
      fixture.detectChanges();
      expect(getSvgAttribute('stroke-width')).toBe('4');
    });
  });

  describe('title', () => {
    it('should set title if provided', () => {
      title.set('Foobar');
      fixture.detectChanges();
      const titleEl = fixture.debugElement.query(By.css('title')).nativeElement;
      expect(titleEl).toBeDefined();
      expect(titleEl.textContent).toBe('Foobar');
    });
    it('should not set aria-hidden when title is set', () => {
      title.set('Foobar');
      fixture.detectChanges();
      expect(getSvgAttribute('aria-hidden')).toBeUndefined;
    });
    it('should set aria-hidden if no title is provided', () => {
      title.set(undefined);
      fixture.detectChanges();
      expect(getSvgAttribute('aria-hidden')).toBeUndefined;
    });
  });

  describe('content projection', () => {
    it('should project content', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.componentRef.setInput('icon', testIcon);
      hostFixture.detectChanges();
      hostFixture.componentRef.setInput('icon', testIcon2);
      hostFixture.detectChanges();
      const rect = hostFixture.debugElement.query(By.css('rect')).nativeElement;
      expect(rect).toBeInstanceOf(SVGElement);
      expect(rect.outerHTML).toBe('<rect x="1" y="1" width="22" height="22"></rect>');
    });
  });
});
