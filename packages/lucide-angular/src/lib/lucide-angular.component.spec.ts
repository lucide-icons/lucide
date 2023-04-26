import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LucideAngularModule} from './lucide-angular.module';
import {formatFixed, LucideAngularComponent} from './lucide-angular.component';
import defaultAttributes from '../icons/constants/default-attributes';
import {LucideIcons} from '../icons/types';

describe('LucideAngularComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    const getSvgAttribute = (attr: string) =>
        testHostFixture.nativeElement.querySelector('svg').getAttribute(attr);
    const testIcons: LucideIcons = {
        Demo: [
            'svg',
            defaultAttributes,
            [['polyline', {points: '1 1 22 22'}]],
        ],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LucideAngularComponent, TestHostComponent],
            imports: [
                LucideAngularModule.pick(testIcons),
            ]
        }).compileComponents();
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });

    it('should create', () => {
        testHostFixture.detectChanges();
        expect(testHostComponent).toBeTruthy();
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
        template: `
            <i-lucide
                name="demo"
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
