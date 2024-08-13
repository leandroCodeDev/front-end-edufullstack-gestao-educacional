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
import { MateriaService } from '../../shared/services/materia/materia.service';
import { Materia } from '../../shared/interfaces/materia';
import { LoginStore } from '../../shared/store/login/Login.store';
import { LoadingService } from '../../shared/services/loading/Loading.service';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.scss'
})
export class DocenteComponent {
  materias: Array<Materia> = [];

  edicao = true;
  docenteId = null

  docenteForm: FormGroup;
  submitted = false;
  dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  cpfRegex = /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/
  telefoneRegex = /^\(\d{2}\) (9 \d{4}|\d{4})-\d{4}$/
  cepRegex = /^\d{5}-\d{3}$/

  constructor(
    public validacao: ValidacaoFormService,
    private viaCep: ViaCepService,
    private router: Router,
    private docenteService: DocenteService,
    private materiaService: MateriaService,
    private activatedRoute: ActivatedRoute,
    private formBuilde: FormBuilder,
    private notificacao: NotificacaoService,
    private locale: Location,
    private loginStore: LoginStore,
    private loadingService: LoadingService
  ) {


    this.docenteForm = this.formBuilde.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(this.telefoneRegex)]),
      genero: new FormControl('', [Validators.required]),
      estadoCivil: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required, Validators.pattern(this.dataRegex)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpf: new FormControl('', [Validators.required, Validators.pattern(this.cpfRegex)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      naturalidade: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      materias: new FormControl(null, [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.pattern(this.cepRegex)]),
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      complemento: new FormControl('', [Validators.required]),
    });

    this.getMaterias()


  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.docenteId = parameters['id'];
      if (this.docenteId) {
        this.edicao = false
        if (!this.podeEditar()) {
          this.notificacao.showDanger('Voce não tem permissão apra realizar essa ação ')
          this.router.navigate(['home']);

        }

        this.docenteService.getDocente(this.docenteId).subscribe((response) => {
          let docente: Docente = response
          this.docenteForm.patchValue({
            nome: docente.nome,
            telefone: docente.telefone,
            genero: docente.genero,
            estadoCivil: docente.estadoCivil,
            dataNascimento: docente.dataNascimento,
            email: docente.email,
            senha: docente.senha,
            cpf: docente.cpf,
            rg: docente.rg,
            naturalidade: docente.naturalidade,
            materias: docente.materias,
            cep: docente.endereco.cep,
            rua: docente.endereco.rua,
            numero: docente.endereco.numero,
            cidade: docente.endereco.cidade,
            estado: docente.endereco.estado,
            complemento: docente.endereco.complemento
          })
        })

      } else {
        if (!this.podeCadastrar()) {
          this.notificacao.showDanger('Voce não tem permissão apra realizar essa ação ')
          this.router.navigate(['home']);
        }

      }
    });
  };


  getMaterias() {
    this.materiaService.getMaterias().subscribe((response) => {
      console.log(response)
      this.materias = response
    })
  }
  salvar() {
    this.submitted = true

    if (this.docenteForm.valid) {

      this.loadingService.showLoading()
      setTimeout(() => {

        let values = this.docenteForm.value
        let docenteFormulario: Docente = {
          nome: values.nome,
          telefone: values.telefone,
          genero: values.genero,
          estadoCivil: values.estadoCivil,
          dataNascimento: values.dataNascimento,
          email: values.email,
          senha: values.senha,
          cpf: values.cpf,
          rg: values.rg,
          naturalidade: values.naturalidade,
          materias: values.materias,
          endereco: {
            cep: values.cep,
            rua: values.rua,
            numero: values.numero,
            cidade: values.cidade,
            estado: values.estado,
            complemento: values.complemento
          }
        }

        if (this.docenteId == null) {
          this.docenteService.postDocente(docenteFormulario).subscribe({
            next: (response): void => {
              this.docenteForm.reset();
              this.submitted = false;
              this.notificacao.showSuccess('Novo registro de docente salvo com sucesso!');
              this.router.navigate(['docentes'])
            },
            error: (error) => {
              this.notificacao.showDanger('Algo deu errado ao tentar salvar o registro de docente.');
            }
          })
        } else {
          docenteFormulario.id = this.docenteId
          this.docenteService.putDocente(docenteFormulario).subscribe({
            next: (response): void => {
              this.docenteForm.reset();
              this.submitted = false;
              this.notificacao.showSuccess('Registro de docente editado com sucesso!');
              this.router.navigate(['docentes'])
            },
            error: (error) => {
              this.notificacao.showDanger('Algo deu errado ao tentar editar o registro de docente.');
            }
          })
        }
      }, 1000)
    } else {
      this.notificacao.showDanger("Um ou mais campos estão incorretor! Verifique as informações do formulario")
    }
  }

  procurarEndereco() {

    if (this.docenteForm.controls['cep'].valid) {
      this.viaCep.getEndereco(this.docenteForm.value.cep).subscribe(
        {
          next: (response): void => {
            let address: any = response;
            this.docenteForm.patchValue({
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

  modoEdicao() {
    this.edicao = true
  }
  excluir() {
    if (this.docenteId) {
      this.loadingService.showLoading()
      setTimeout(() => {
        if (this.docenteId) this.docenteService.delete(this.docenteId).subscribe(() => {
          this.notificacao.showSuccess('Registro de docente deletado com sucesso!');
          this.router.navigate(['docentes'])
        })
      }, 1000)
    }
  }


  podeCadastrar() {
    return this.loginStore.isAdmin()
  }

  podeEditar() {
    return this.docenteId != null && this.loginStore.isAdmin()
  }

  podeExcluir() {
    return this.docenteId != null && this.loginStore.isAdmin()
  }

  voltar() {
    this.loadingService.showLoading()
    setTimeout(() => {
      this.locale.back()
    }, 1000)
  }




}
