import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLeaveComponent } from './car-leave.component';

describe('CarLeaveComponent', () => {
  let component: CarLeaveComponent;
  let fixture: ComponentFixture<CarLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
