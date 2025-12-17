import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { formatFixed, LucideIcon } from './lucide-icon.component';
import defaultAttributes from '../icons/constants/default-attributes';
import { LucideIconData } from '../icons/types';

describe('LucideAngularComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  const getSvgAttribute = (attr: string) =>
    testHostFixture.nativeElement.querySelector('svg').getAttribute(attr);
  const testIcon: LucideIconData = [['polyline', { points: '1 1 22 22' }]];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LucideIcon, TestHostComponent],
      imports: [],
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

    expect(getSvgAttribute('class')).toBe('lucide lucide-demo my-icon');
  });

  it('should set color', () => {
    const color = 'red';
    testHostComponent.setColor(color);
    testHostFixture.detectChanges();
    expect(getSvgAttribute('stroke')).toBe(color);
  });

  it('should set size', () => {
    const size = 12;
    testHostComponent.setSize(size);
    testHostFixture.detectChanges();
    expect(getSvgAttribute('width')).toBe(size.toString(10));
  });

  it('should set stroke width', () => {
    const strokeWidth = 1.41;
    testHostComponent.setStrokeWidth(strokeWidth);
    testHostFixture.detectChanges();
    expect(getSvgAttribute('stroke-width')).toBe(strokeWidth.toString(10));
  });

  it('should adjust stroke width', () => {
    const strokeWidth = 2;
    const size = 12;
    testHostComponent.setStrokeWidth(strokeWidth);
    testHostComponent.setSize(12);
    testHostComponent.setAbsoluteStrokeWidth(true);
    testHostFixture.detectChanges();
    expect(getSvgAttribute('stroke-width')).toBe(
      formatFixed(strokeWidth / (size / defaultAttributes.height))
    );
  });

  @Component({
    selector: 'lucide-spec-host-component',
    template: ` <i-lucide
      name="demo"
      [img]="testIcon"
      class="my-icon"
      [color]="color"
      [size]="size"
      [strokeWidth]="strokeWidth"
      [absoluteStrokeWidth]="absoluteStrokeWidth"
    ></i-lucide>`,
  })
  class TestHostComponent {
    color?: string;
    size?: number;
    strokeWidth?: number;
    absoluteStrokeWidth = true;
    readonly testIcon = testIcon;

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
  }
});
