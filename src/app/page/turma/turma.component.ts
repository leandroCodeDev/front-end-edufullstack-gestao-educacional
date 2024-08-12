import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { ValidacaoFormService } from '../../shared/services/validacaoForm/validacao-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { CommonModule, formatDate, Location } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Materia } from '../../shared/interfaces/materia';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { Docente } from '../../shared/interfaces/docente';
import { TurmaService } from '../../shared/services/turma/turma.service';
import { Turma } from '../../shared/interfaces/turma';
import { LoginStore } from '../../shared/store/login/Login.store';
import { LoadingService } from '../../shared/services/loading/Loading.service';

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
  turmaId: string | null = null;
  editarmode = true

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
    private locale: Location,
    private loginStore: LoginStore,
    private router: Router,
    private loadingService: LoadingService

  ) {
    if (!this.podeCadastrar()) {
      this.notificacao.showDanger('Voce não tem permissão apra realizar essa ação ')
      this.router.navigate(['home']);
    }
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
      this.loadingService.showLoading()
      setTimeout(() => {
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
      }, 1000)
    } else {
      this.notificacao.showDanger("Um ou mais campos estão incorretor! Verifique as informações do formulario")
    }

  }



  getDocentes() {
    this.docenteService.getDocentes().subscribe((response) => {
      this.professores = response
    })
  }


  excluir() {
    if (this.turmaId) {
      this.loadingService.showLoading()
      setTimeout(() => {
        if (this.turmaId) this.turmaService.delete(this.turmaId).subscribe(() => {
          this.notificacao.showSuccess('Registro de turma deletado com sucesso!');
          this.router.navigate(['home'])
        })
      }, 1000)
    }
  }

  modoEdicao() {
    this.editarmode = true
  }

  podeCadastrar() {
    return this.loginStore.isAdmin() || this.loginStore.isDocente()
  }

  podeEditar() {
    return this.turmaId != null && (
      this.loginStore.isAdmin() ||
      this.turmaForm.value.professor == this.loginStore.get().nome ||
      this.turmaForm.value.professor == this.loginStore.get().id
    )
  }

  podeExcluir() {
    return this.turmaId != null && this.loginStore.isAdmin()
  }



  voltar() {
    this.loadingService.showLoading()
    setTimeout(() => {
      this.locale.back()
    }, 1000)
  }

}



