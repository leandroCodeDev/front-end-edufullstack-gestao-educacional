import { TestBed } from '@angular/core/testing';

import { CursoExtraServiceService } from './curso-extra-service.service';

describe('CursoExtraServiceService', () => {
  let service: CursoExtraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoExtraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
