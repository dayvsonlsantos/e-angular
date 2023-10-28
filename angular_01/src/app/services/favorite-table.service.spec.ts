import { TestBed } from '@angular/core/testing';

import { FavoriteTableService } from './favorite-table.service';

describe('FavoriteTableService', () => {
  let service: FavoriteTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
