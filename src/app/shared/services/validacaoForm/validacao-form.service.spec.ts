import { TestBed } from '@angular/core/testing';

import { ValidacaoFormService } from './validacao-form.service';

describe('ValidacaoFormService', () => {
  let service: ValidacaoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacaoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
