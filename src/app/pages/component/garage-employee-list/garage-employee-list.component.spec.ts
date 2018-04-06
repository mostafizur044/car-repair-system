import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageEmployeeListComponent } from './garage-employee-list.component';

describe('GarageEmployeeListComponent', () => {
  let component: GarageEmployeeListComponent;
  let fixture: ComponentFixture<GarageEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarageEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
