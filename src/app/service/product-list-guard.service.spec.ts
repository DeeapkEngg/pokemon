import { TestBed } from '@angular/core/testing';

import { ProductListGuardService } from './product-list-guard.service';

describe('ProductListGuardService', () => {
  let service: ProductListGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
