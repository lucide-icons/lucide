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
  const getSvgAttribute = (attr: string) => fixture.nativeElement.getAttribute(attr);
  const testIcon: LucideIconData = {
    name: 'demo',
    node: [['polyline', { points: '1 1 22 22' }]],
  };
  const testIcon2: LucideIconData = {
    name: 'demo-other',
    node: [
      ['circle', { cx: 12, cy: 12, r: 8 }],
      ['polyline', { points: '1 1 22 22' }],
    ],
    aliases: ['demo-2'],
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
    expect(fixture.nativeElement.innerHTML).toBe(
      '<!--container--><circle cx="12" cy="12" r="8"></circle><polyline points="1 1 22 22"></polyline><!--ng-container-->',
    );
  });

  it('should remove children on change', () => {
    icon.set(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toBe('<!--container--><!--ng-container-->');
  });

  describe('iconInput', () => {
    it('should support LucideIconData input', () => {
      icon.set(testIcon);
      fixture.detectChanges();
      expect(component['icon']()).toBe(testIcon);
      expect(fixture.nativeElement.innerHTML).toBe(
        '<!--container--><polyline points="1 1 22 22"></polyline><!--ng-container-->',
      );
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
      expect(getSvgAttribute('class')).toBe('lucide lucide-demo');
    });
    it('should add backwards compatible classes from aliases', () => {
      icon.set(testIcon2);
      fixture.detectChanges();
      expect(getSvgAttribute('class')).toBe('lucide lucide-demo-other lucide-demo-2');
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
