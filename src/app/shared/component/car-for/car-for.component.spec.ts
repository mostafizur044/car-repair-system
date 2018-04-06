import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarForComponent } from './car-for.component';

describe('CarForComponent', () => {
  let component: CarForComponent;
  let fixture: ComponentFixture<CarForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
