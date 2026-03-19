import {
  ChangeDetectionStrategy,
  Component,
  inputBinding,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { provideLucideConfig } from './lucide-config';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { lucideIconTemplate } from './lucide-icon-template';
import { LucideIconBase } from './lucide-icon-base';
import { LucideIconData } from './types';

@Component({
  selector: 'svg[lucideCircleCheck], svg[lucideCheckCircle2]',
  template: lucideIconTemplate,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LucideCircleCheck extends LucideIconBase {
  static readonly icon: LucideIconData = {
    name: 'circle-check',
    size: 24,
    node: [
      ['circle', { cx: '12', cy: '12', r: '10' }],
      ['path', { d: 'm9 12 2 2 4-4' }],
    ],
    aliases: ['check-circle-2'],
  };
  protected override readonly icon = signal(LucideCircleCheck.icon);
}

describe('LucideIconBase', () => {
  let component: LucideCircleCheck;
  let fixture: ComponentFixture<LucideCircleCheck>;
  let title: WritableSignal<string | undefined>;
  let color: WritableSignal<string | undefined>;
  let size: WritableSignal<string | number | undefined>;
  let strokeWidth: WritableSignal<string | number | undefined>;
  let absoluteStrokeWidth: WritableSignal<boolean | undefined>;
  const getSvgAttribute = (attr: string) => fixture.nativeElement.getAttribute(attr);
  function createComponent() {
    return TestBed.createComponent(LucideCircleCheck, {
      inferTagName: true,
      bindings: [
        inputBinding('title', title),
        inputBinding('color', color),
        inputBinding('size', size),
        inputBinding('strokeWidth', strokeWidth),
        inputBinding('absoluteStrokeWidth', absoluteStrokeWidth),
      ],
    });
  }
  beforeEach(async () => {
    title = signal(undefined);
    color = signal(undefined);
    size = signal(undefined);
    strokeWidth = signal(undefined);
    absoluteStrokeWidth = signal(undefined);
    fixture = createComponent();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render children', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toBe(
      '<!--container--><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path><!--ng-container-->',
    );
  });

  describe('class', () => {
    it('should add all classes', () => {
      fixture.detectChanges();
      expect(getSvgAttribute('class')).toBe('lucide lucide-circle-check lucide-check-circle-2');
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
      absoluteStrokeWidth.set(true);
      fixture.detectChanges();
      expect(getSvgAttribute('stroke-width')).toBe('2');
    });
    it('should not set vector-effect on children', () => {
      absoluteStrokeWidth.set(false);
      for (const child of fixture.nativeElement.children) {
        expect(child.getAttribute('vector-effect')).toBeNull();
      }
    });
    it('should set vector-effect on children', () => {
      absoluteStrokeWidth.set(true);
      for (const child of fixture.nativeElement.children) {
        expect(child.getAttribute('vector-effect')).toBe('non-scaling-stroke');
      }
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
      expect(getSvgAttribute('aria-hidden')).toBe('false');
    });
    it('should set aria-hidden if no title is provided', () => {
      title.set(undefined);
      fixture.detectChanges();
      expect(getSvgAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('LUCIDE_CONFIG', () => {
    beforeEach(async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideLucideConfig({
            color: 'red',
            strokeWidth: 1,
            size: 12,
            absoluteStrokeWidth: true,
          }),
        ],
      });
      await TestBed.compileComponents();
      fixture = createComponent();
      component = fixture.componentInstance;
    });
    describe('color', () => {
      it('should use color from config', () => {
        fixture.detectChanges();
        expect(getSvgAttribute('stroke')).toBe('red');
      });
      it('should use override color from config', () => {
        color.set('pink');
        fixture.detectChanges();
        expect(getSvgAttribute('stroke')).toBe('pink');
      });
    });
    describe('strokeWidth', () => {
      it('should use stroke width from config', () => {
        fixture.detectChanges();
        expect(getSvgAttribute('stroke-width')).toBe('1');
      });
      it('should use override stroke width from config', () => {
        strokeWidth.set(3);
        fixture.detectChanges();
        expect(getSvgAttribute('stroke-width')).toBe('3');
      });
    });
    describe('size', () => {
      it('should use size from config', () => {
        fixture.detectChanges();
        expect(getSvgAttribute('width')).toBe('12');
        expect(getSvgAttribute('height')).toBe('12');
      });
      it('should use override size from config', () => {
        size.set('48');
        fixture.detectChanges();
        expect(getSvgAttribute('width')).toBe('48');
        expect(getSvgAttribute('height')).toBe('48');
      });
    });
    describe('absoluteStrokeWidth', () => {
      it('should use absoluteStrokeWidth from config', () => {
        for (const child of fixture.nativeElement.children) {
          expect(child.getAttribute('vector-effect')).toBe('non-scaling-stroke');
        }
      });
      it('should override absoluteStrokeWidth', () => {
        absoluteStrokeWidth.set(false);
        for (const child of fixture.nativeElement.children) {
          expect(child.getAttribute('vector-effect')).toBeNull();
        }
      });
    });
  });
});
