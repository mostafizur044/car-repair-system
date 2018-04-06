import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEntranceComponent } from './car-entrance.component';

describe('CarEntranceComponent', () => {
  let component: CarEntranceComponent;
  let fixture: ComponentFixture<CarEntranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEntranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
