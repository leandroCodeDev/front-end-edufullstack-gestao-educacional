import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { Docente } from '../../shared/interfaces/docente';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DocenteFormControl } from './docenteFormControl.service';
import { EnderecoFormControl } from './enderecoFormControl.service';
import { NotificacaoService } from '../../shared/services/notificacao/notificacao.service';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule, CommonModule],
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


  docenteForm: FormGroup;
  enderecoForm: FormGroup;
  submitted = false;

  constructor(
    public docenteFormControl: DocenteFormControl,
    public enderecoFormControl: EnderecoFormControl,
    private router: Router,
    private docenteService: DocenteService,
    private activatedRoute: ActivatedRoute,
    private formBuilde: FormBuilder,
    private notificacao:NotificacaoService
  ) { 


    this.docenteForm = this.formBuilde.group({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required]),
      naturalidade: new FormControl('', [Validators.required]),
      materias: new FormControl('', [Validators.required]),
    });
  
    this.enderecoForm = this.formBuilde.group({
      cep: new FormControl('', [Validators.required]),
      rua: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      complemto: new FormControl('', [Validators.required]),
    });

    this.docenteFormControl.form = this.docenteForm;
    this.enderecoFormControl.form = this.enderecoForm



  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      let docenteId = parameters['id'];
      if (docenteId) {


      } else {

      }
    });
  };


  salvar() {
    console.log(this.docenteForm.controls['nome'].dirty)
    this.submitted = true
    this.docenteFormControl.submited()
    this.enderecoFormControl.submited()
    if (this.docenteForm.valid && this.enderecoForm.valid) {
      
    }else{
      this.notificacao.showDanger("Um ou mais campos estão incorretor! Verifique as informações do formulario")
    }
    
  }

}
