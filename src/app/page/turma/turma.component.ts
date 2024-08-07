import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { ValidacaoFormService } from '../../shared/services/validacaoForm/validacao-form.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { CommonModule, formatDate, Location } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Materia } from '../../shared/interfaces/materia';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { Docente } from '../../shared/interfaces/docente';
import { TurmaService } from '../../shared/services/turma/turma.service';
import { Turma } from '../../shared/interfaces/turma';

@Component({
  selector: 'app-turma',
  standalone: true,
  imports: [NavbarComponent, NgSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.scss'
})
export class TurmaComponent {

  professores: Array<Docente> = [];

  turmaForm: FormGroup;
  submitted = false;

  dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  cpfRegex = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/
  telefoneRegex = /^\(\d{2}\) (9 \d{4}|\d{4})-\d{4}$/
  cepRegex = /^\d{5}-\d{3}$/
  horarioRegex = /^([01]\d|2[0-3]):[0-5]\d$/



  dataHoraAtual: Date = new Date();
  dataAtual: string = '';
  horaAtual: string = '';

  constructor(
    public validacao: ValidacaoFormService,
    private activatedRoute: ActivatedRoute,
    private formBuilde: FormBuilder,
    private notificacao: NotificacaoService,
    private docenteService: DocenteService,
    private turmaService: TurmaService,
    private locale: Location

  ) {
    this.getDocentes()

    this.turmaForm = this.formBuilde.group({
      professor: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      dataInicio: new FormControl(formatDate(new Date(), 'dd/MM/yyyy', "en"), [Validators.required, Validators.pattern(this.dataRegex)]),
      dataFim: new FormControl(formatDate(new Date(), 'dd/MM/yyyy', "en"), [Validators.required, Validators.pattern(this.dataRegex)]),
      horario: new FormControl(formatDate(new Date(), 'HH:mm', "en"), [Validators.required, Validators.pattern(this.horarioRegex)]),
    })

  }
  salvar() {
    this.submitted = true

    if (this.turmaForm.valid) {
      let values = this.turmaForm.value
      let turmaFormulario: Turma = {
        professor: values.professor,
        nome: values.nome,
        dataInicio: values.dataInicio,
        dataFim: values.dataFim,
        horario: values.horario,
      }

      this.turmaService.postTurma(turmaFormulario).subscribe({
        next: (response): void => {
          this.turmaForm.reset();
          this.submitted = false;
          this.notificacao.showSuccess('Novo registro de turma salvo com sucesso!');
          this.locale.back()
        },
        error: (error) => {
          this.notificacao.showDanger('Algo deu errado ao tentar salvar o registro de turma.');
        }
      })
    } else {
      this.notificacao.showDanger("Um ou mais campos estão incorretor! Verifique as informações do formulario")
    }

  }



  getDocentes() {
    this.docenteService.getDocentes().subscribe((response) => {
      this.professores = response
    })
  }

}



