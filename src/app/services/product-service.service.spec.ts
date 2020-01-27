import { TestBed } from '@angular/core/testing';

import { ProductSeviceService } from './cart-service.service';

describe('ProductSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSeviceService = TestBed.get(ProductSeviceService);
    expect(service).toBeTruthy();
  });
});
