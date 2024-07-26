import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloBotoesComponent } from './titulo-botoes.component';

describe('TituloBotoesComponent', () => {
  let component: TituloBotoesComponent;
  let fixture: ComponentFixture<TituloBotoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloBotoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloBotoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
