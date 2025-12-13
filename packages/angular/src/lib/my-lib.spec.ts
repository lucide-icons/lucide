import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLib } from './my-lib';

describe('MyLib', () => {
  let component: MyLib;
  let fixture: ComponentFixture<MyLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
