import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { Materia } from '../../shared/interfaces/materia';
import { MateriaService } from '../../shared/services/materia/materia.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ValidacaoFormService } from '../../shared/services/validacaoForm/validacao-form.service';
import { CommonModule } from '@angular/common';
import { Docente } from '../../shared/interfaces/docente';
import { AlunoService } from '../../shared/services/aluno/aluno.service';
import { Aluno } from '../../shared/interfaces/aluno';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { LoginStore } from '../../shared/store/login/Login.store';
import { usuario } from '../../shared/interfaces/usuario';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [NavbarComponent, NgSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.scss'
})
export class NotaComponent {

  materias: Array<Materia> = [];
  professores: Array<Docente> = [];
  alunos: Array<Aluno> = [];
  notaForm: FormGroup;
  submitted = false;
  usuarioLogado!: usuario

  dataAtual: string = '';

  dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  cpfRegex = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/
  telefoneRegex = /^\(\d{2}\) (9 \d{4}|\d{4})-\d{4}$/
  cepRegex = /^\d{5}-\d{3}$/

  constructor(
    public validacao: ValidacaoFormService,
    private materiaService: MateriaService,
    private alunoService: AlunoService,
    private docenteService: DocenteService,
    private activatedRoute: ActivatedRoute,
    private formBuilde: FormBuilder,
    private notificacao: NotificacaoService,
    private loginStore: LoginStore,
  ) {
    this.usuarioLogado = loginStore.get()

    this.dataAtual = new Date().toLocaleDateString('pt-BR')

    this.notaForm = this.formBuilde.group({
      professor: new FormControl('', [Validators.required]),
      aluno: new FormControl('', [Validators.required]),
      materia: new FormControl('', [Validators.required]),
      nomeAvaliacao: new FormControl('', [Validators.required]),
      dataAvaliacao: new FormControl(this.dataAtual, [Validators.required, Validators.pattern(this.dataRegex)]),
      nota: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    })

    this.getAlunos()
    this.getDocentes()
    this.getMaterias()

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      let alunoId = parameters['id'];
      if (alunoId) {
        this.notaForm.patchValue({
          aluno: alunoId
        })
      }
      if (this.usuarioLogado.perfil == 'docente') {
        this.notaForm.patchValue({
          professor: this.usuarioLogado.id
        })
      }
    });
  };

  getAlunos() {
    this.activatedRoute.params.subscribe((parameters) => {
      let alunoId = parameters['id'];
      if (alunoId) {
        this.alunoService.getAluno(alunoId).subscribe((response) => {
          this.alunos = [response]
        })
      }else{
        this.alunoService.getAlunos().subscribe((response) => {
          this.alunos = response
        })
      }
    });



    
  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe((response) => {
      this.materias = response
    })
  }

  getDocentes() {
    if (this.usuarioLogado.perfil == 'docente') {
      this.docenteService.getDocente(this.usuarioLogado.id).subscribe((response) => {
        this.professores = [response]
      })
    } else {
      this.docenteService.getDocentes().subscribe((response) => {
        this.professores = response
      })
    }
  }

  salvar() {
    this.submitted = true

    if (this.notaForm.valid) {

    } else {
      this.notificacao.showDanger("Um ou mais campos estão incorretor! Verifique as informações do formulario")
    }

  }
}
