import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule } from './lucide-angular.module';
import { formatFixed, LucideAngularComponent } from './lucide-angular.component';
import defaultAttributes from '../icons/constants/default-attributes';
import { LucideIcons } from '../icons/types';

describe('LucideAngularComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  const getAttribute = (attr: string) =>
    testHostFixture.nativeElement.querySelector('svg').getAttribute(attr);
  const getRootAttribute = (attr: string) =>
    testHostFixture.nativeElement.querySelector('i-lucide').getAttribute(attr);
  const testIcons: LucideIcons = {
    Demo: [['polyline', { points: '1 1 22 22' }]],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LucideAngularComponent, TestHostComponent],
      imports: [LucideAngularModule.pick(testIcons)],
    }).compileComponents();
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should create', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent).toBeTruthy();
  });

  it('should add all classes', () => {
    testHostFixture.detectChanges();

    expect(getAttribute('class')).toBe('lucide lucide-demo my-icon');
  });

  it('should set color', () => {
    const color = 'red';
    testHostComponent.setColor(color);
    testHostFixture.detectChanges();
    expect(getAttribute('stroke')).toBe(color);
  });

  it('should set size', () => {
    const size = 12;
    testHostComponent.setSize(size);
    testHostFixture.detectChanges();
    expect(getAttribute('width')).toBe(size.toString(10));
  });

  it('should set stroke width', () => {
    const strokeWidth = 1.41;
    testHostComponent.setStrokeWidth(strokeWidth);
    testHostFixture.detectChanges();
    expect(getAttribute('stroke-width')).toBe(strokeWidth.toString(10));
  });

  it('should adjust stroke width', () => {
    const strokeWidth = 2;
    const size = 12;
    testHostComponent.setStrokeWidth(strokeWidth);
    testHostComponent.setSize(12);
    testHostComponent.setAbsoluteStrokeWidth(true);
    testHostFixture.detectChanges();
    expect(getAttribute('stroke-width')).toBe(
      formatFixed(strokeWidth / (size / defaultAttributes.height)),
    );
  });

  it('should have aria-hidden prop when no aria prop is present', async () => {
    testHostFixture.detectChanges();
    expect(getRootAttribute('aria-hidden')).toBe('true');
  });

  it('should not have aria-hidden prop when aria prop is present', async () => {
    const ariaLabel = 'Demo icon';
    testHostComponent.setAriaLabel(ariaLabel);
    testHostFixture.detectChanges();
    expect(getRootAttribute('aria-label')).toBe(ariaLabel);
    expect(getRootAttribute('aria-hidden')).toBeNull();
  });

  it('should not have aria-hidden prop when title prop is present', async () => {
    const ariaLabel = 'Demo icon';
    testHostComponent.setTitle(ariaLabel);
    testHostFixture.detectChanges();
    expect(getRootAttribute('title')).toBe(ariaLabel);
    expect(getRootAttribute('aria-hidden')).toBeNull();
  });

  it('should never override aria-hidden prop', async () => {
    testHostComponent.setAriaHidden(true);
    testHostFixture.detectChanges();
    expect(getRootAttribute('aria-hidden')).toBe('true');
  });

  @Component({
    selector: 'lucide-spec-host-component',
    template: `<i-lucide
      name="demo"
      class="my-icon"
      [color]="color"
      [size]="size"
      [strokeWidth]="strokeWidth"
      [absoluteStrokeWidth]="absoluteStrokeWidth"
      [attr.aria-label]="ariaLabel"
      [attr.title]="title"
      [attr.aria-hidden]="ariaHidden"
    >
    </i-lucide>`,
  })
  class TestHostComponent {
    color?: string;
    size?: number;
    strokeWidth?: number;
    absoluteStrokeWidth = true;
    ariaLabel?: string = undefined;
    title?: string = undefined;
    ariaHidden?: boolean = undefined;

    setColor(color: string): void {
      this.color = color;
    }

    setSize(size: number): void {
      this.size = size;
    }

    setStrokeWidth(strokeWidth: number): void {
      this.strokeWidth = strokeWidth;
    }

    setAbsoluteStrokeWidth(absoluteStrokeWidth: boolean): void {
      this.absoluteStrokeWidth = absoluteStrokeWidth;
    }

    setAriaLabel(label: string): void {
      this.ariaLabel = label;
    }

    setTitle(title: string): void {
      this.title = title;
    }

    setAriaHidden(ariaHidden: boolean): void {
      this.ariaHidden = ariaHidden;
    }
  }
});
