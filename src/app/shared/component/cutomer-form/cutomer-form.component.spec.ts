import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerFormComponent } from './cutomer-form.component';

describe('CutomerFormComponent', () => {
  let component: CutomerFormComponent;
  let fixture: ComponentFixture<CutomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutomerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
