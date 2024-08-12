import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { Docente } from '../../shared/interfaces/docente';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { ValidacaoFormService } from '../../shared/services/validacaoForm/validacao-form.service';
import { ViaCepService } from '../../shared/services/viaCep/via-cep.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Turma } from '../../shared/interfaces/turma';
import { TurmaService } from '../../shared/services/turma/turma.service';
import { Aluno } from '../../shared/interfaces/aluno';
import { AlunoService } from '../../shared/services/aluno/aluno.service';
import { LoginStore } from '../../shared/store/login/Login.store';
import { LoadingService } from '../../shared/services/loading/Loading.service';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.scss'
})
export class AlunoComponent {
  turmas: Array<Turma> = [];
  alunoForm: FormGroup;
  submitted = false;
  dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  cpfRegex = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/
  telefoneRegex = /^\(\d{2}\) (9 \d{4}|\d{4})-\d{4}$/
  cepRegex = /^\d{5}-\d{3}$/

  alunoId!: string;
  editeMode = true


  constructor(
    public validacao: ValidacaoFormService,
    private viaCep: ViaCepService,
    private router: Router,
    private alunoService: AlunoService,
    private docenteService: DocenteService,
    private turmaService: TurmaService,
    private activatedRoute: ActivatedRoute,
    private formBuilde: FormBuilder,
    private notificacao: NotificacaoService,
    private locate: Location,
    private loginSore: LoginStore,
    private loadingService: LoadingService
  ) {

    if (!this.podeCadastrar()) {
      this.locate.back()
    }


    this.alunoForm = this.formBuilde.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(this.telefoneRegex)]),
      genero: new FormControl('', [Validators.required]),
      turma: new FormControl(null, [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required, Validators.pattern(this.dataRegex)]),
      email: new FormControl('', [Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpf: new FormControl('', [Validators.required, Validators.pattern(this.cpfRegex)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      naturalidade: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      cep: new FormControl('', [Validators.required, Validators.pattern(this.cepRegex)]),
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      complemento: new FormControl('', [Validators.required]),
    });

    this.getTurmas()
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.alunoId = parameters['id'];
      if (this.alunoId) {
        if (!this.podeEditar()) {
          this.notificacao.showDanger('Voce não tem permissão apra realizar essa ação ')
          this.router.navigate(['home']);
        }
        this.editeMode = false
        this.alunoService.getAluno(this.alunoId).subscribe((response) => {
          this.alunoForm.patchValue({
            nome: response.nome,
            telefone: response.telefone,
            genero: response.genero,
            turma: response.turma,
            dataNascimento: response.dataNascimento,
            email: response.email,
            senha: response.senha,
            cpf: response.cpf,
            rg: response.rg,
            naturalidade: response.naturalidade,
            cep: response.endereco.cep,
            rua: response.endereco.rua,
            numero: response.endereco.numero,
            cidade: response.endereco.cidade,
            estado: response.endereco.estado,
            complemento: response.endereco.complemento
          })
        })
      } else {
        if (!this.podeCadastrar()) {
          this.notificacao.showDanger('Voce não tem permissão apra realizar essa ação ')
          this.router.navigate(['home']);
        }
        this.editeMode = true
      }
    });
  };


  getTurmas() {
    this.turmaService.getTurmas().subscribe((response) => {
      this.turmas = response
    })
  }
  salvar() {
    this.submitted = true
    if (this.alunoForm.valid) {
      this.loadingService.showLoading()
      setTimeout(() => {
        let values = this.alunoForm.value
        let alunoFormulario: Aluno = {
          nome: values.nome,
          telefone: values.telefone,
          genero: values.genero,
          turma: values.materias,
          dataNascimento: values.dataNascimento,
          email: values.email,
          senha: values.senha,
          cpf: values.cpf,
          rg: values.rg,
          naturalidade: values.naturalidade,
          endereco: {
            cep: values.cep,
            rua: values.rua,
            numero: values.numero,
            cidade: values.cidade,
            estado: values.estado,
            complemento: values.complemento
          }
        }


        if (this.alunoId == null) {
          this.alunoService.postAluno(alunoFormulario).subscribe({
            next: (response): void => {
              this.alunoForm.reset();
              this.submitted = false;
              this.notificacao.showSuccess('Novo registro de aluno salvo com sucesso!');
              this.locate.back()
            },
            error: (error) => {
              this.notificacao.showDanger('Algo deu errado ao tentar salvar o registro de docente.');
            }
          })
        } else {
          alunoFormulario.id = this.alunoId
          this.alunoService.putAluno(alunoFormulario).subscribe({
            next: (response): void => {
              this.alunoForm.reset();
              this.submitted = false;
              this.notificacao.showSuccess('Registro de aluno editado com sucesso!');
              this.locate.back()
            },
            error: (error) => {
              this.notificacao.showDanger('Algo deu errado ao tentar editar o registro de aluno.');
            }
          })
        }
      }, 1000)
    } else {
      this.notificacao.showDanger("Um ou mais campos estão incorretor! Verifique as informações do formulario")
    }


  }

  procurarEndereco() {

    if (this.alunoForm.controls['cep'].valid) {
      this.viaCep.getEndereco(this.alunoForm.value.cep).subscribe(
        {
          next: (response): void => {
            let address: any = response;
            this.alunoForm.patchValue({
              rua: address.logradouro,
              bairro: address.bairro,
              cidade: address.localidade,
              estado: address.uf
            }
            );
            if (address.logradouro) {
              this.notificacao.showSuccess('Dados de endereço encontrados.');
            }
            else {
              this.notificacao.showDanger('Informações de endereço não encontradas.');
            };
          },
          error: (error) => {
            this.notificacao.showDanger('CEP Inválido.');
          }
        }
      );
    }
  };

  podeCadastrar() {
    return this.loginSore.isAdmin()
  }

  podeEditar() {
    return this.alunoId != null && this.loginSore.isAdmin()
  }

  podeExcluir() {
    return this.alunoId != null && this.loginSore.isAdmin()
  }

  voltar() {
    this.loadingService.showLoading()
    setTimeout(() => {
      this.locate.back()
    }, 1000)

  }

  modoEdicao() {
    this.editeMode = true
  }

  excluir() {
    // deletar um aluno caso o mesmo não possua turmas e avaliações vinculadas aluno sempre esta vinculado “
    this.notificacao.showDanger('Impssivel deletar aluno, remova vinculo de turmas e avaliações do aluno primeiro!');
    return;

    if (this.alunoId) {
      this.loadingService.showLoading()
      setTimeout(() => {
        this.alunoService.delete(this.alunoId).subscribe(() => {
          this.notificacao.showSuccess('Registro de aluno deletado com sucesso!');
          this.router.navigate(['home'])
        })
      }, 1000)
    }
  }
}
