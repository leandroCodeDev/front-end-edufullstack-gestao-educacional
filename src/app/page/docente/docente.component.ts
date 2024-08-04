import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { Docente } from '../../shared/interfaces/docente';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { ValidacaoFormService } from '../../shared/services/validacaoForm/validacao-form.service';
import { ViaCepService } from '../../shared/services/viaCep/via-cep.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MateriaService } from '../../shared/services/materia/materia.service';
import { Materia } from '../../shared/interfaces/materia';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule,NgSelectModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.scss'
})
export class DocenteComponent {
  docente: Docente = {
    nome: 'Fernanda Ribeiro',
    telefone: '48-990987654',
    genero: 'Feminino',
    estadoCivil: 'Solteira',
    dataNascimento: '1998-02-02',
    email: 'fernanda.ribeiro@example.com',
    senha: 'senha890',
    cpf: '78965412300',
    rg: '4321098',
    naturalidade: 'Tubarão',
    materias: 'Biologia, Química',
    endereco: {
      cep: '88900000',
      rua: 'Rua das Magnólias',
      numero: '707',
      cidade: 'Tubarão',
      estado: 'SC',
      complemento: 'Apto 505'
    }
  }

  

  materias:Array<Materia> = [];


  docenteForm: FormGroup;
  submitted = false;
  dataRegex = /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d{4}$/;
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
    private notificacao: NotificacaoService
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
      complemto: new FormControl('', [Validators.required]),
    });

    this.getMaterias()


  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      let docenteId = parameters['id'];
      if (docenteId) {


      } else {

      }
    });
  };


  getMaterias(){
    this.materiaService.getMaterias().subscribe((response) => {
      console.log(response)
      this.materias = response
    })
  }
  salvar() {
    this.submitted = true

    if (this.docenteForm.valid) {

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

  focado(){
    console.log("focou")
  }


}
