import { TestBed } from '@angular/core/testing';

import { PokemonFeedService } from './pokemon-feed.service';

describe('PokemonFeedService', () => {
  let service: PokemonFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
