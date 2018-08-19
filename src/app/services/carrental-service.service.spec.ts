import { TestBed, inject } from '@angular/core/testing';

import { CarrentalServiceService } from './carrental-service.service';

describe('CarrentalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarrentalServiceService]
    });
  });

  it('should be created', inject([CarrentalServiceService], (service: CarrentalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
