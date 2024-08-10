import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoHomeComponent } from './aluno-home.component';

describe('AlunoHomeComponent', () => {
  let component: AlunoHomeComponent;
  let fixture: ComponentFixture<AlunoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
