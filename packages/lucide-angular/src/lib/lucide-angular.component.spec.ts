import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule } from './lucide-angular.module';
import { LucideAngularComponent } from './lucide-angular.component';

describe('LucideAngularComponent', () => {
  let component: LucideAngularComponent;
  let fixture: ComponentFixture<LucideAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LucideAngularComponent ],
      imports: [
        LucideAngularModule.pick({ })
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LucideAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
