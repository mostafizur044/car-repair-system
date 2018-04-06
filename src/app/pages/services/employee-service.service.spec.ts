import { TestBed, inject } from '@angular/core/testing';

import { EmployeeServiceService } from './employee-service.service';

describe('EmployeeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeServiceService]
    });
  });

  it('should be created', inject([EmployeeServiceService], (service: EmployeeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
