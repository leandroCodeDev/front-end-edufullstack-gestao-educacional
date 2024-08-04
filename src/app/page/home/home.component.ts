import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/componentes/navbar/navbar.component';
import { CardUserComponent } from '../../shared/componentes/card-user/card-user.component';
import { CardContadorComponent } from '../../shared/componentes/card-contador/card-contador.component';
import { DocenteService } from '../../shared/services/docente/docente.service';
import { TurmaService } from '../../shared/services/turma/turma.service';
import { AlunoService } from '../../shared/services/aluno/aluno.service';
import { Aluno } from '../../shared/interfaces/aluno';
import { Docente } from '../../shared/interfaces/docente';
import { Turma } from '../../shared/interfaces/turma';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Notificacao, NotificacaoService } from '../../shared/services/notificacao/notificacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardUserComponent, CardContadorComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  alunos:Array<Aluno> = []
  alunosFiltrados:Array<Aluno> = []
  docentes:Array<Docente> = []
  turmas:Array<Turma> = []
  pesquisar:string = ''
  searchControl:FormGroup
  estatisticas:Array<any> = []

  constructor(
    private router: Router,
    private docenteService: DocenteService,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private notificacao:NotificacaoService
  ){
    this.getAlunos()
    this.getTurmas()
    this.getDocentes()

    this.searchControl = new FormGroup({
      search: new FormControl('')
    });
    
  }

  getEstatisticas(){
    return [
      {contador:this.docentes.length, titulo: 'Docentes'},
      {contador:this.alunos.length, titulo: 'Alunos'},
      {contador:this.turmas.length, titulo: 'Turmas'}

    ]
  }

  getDocentes(){
    this.docenteService.getDocentes().subscribe((response) => {
      this.docentes = response
    })
  }

  getTurmas(){
    this.turmaService.getTurmas().subscribe((response) => {
      this.turmas = response
    })
  }

  getAlunos(){
    this.alunoService.getAlunos().subscribe((response) => {
      this.alunos = response
      this.alunosFiltrados = this.alunos
    })
  }

  buscar(){
    const search = this.searchControl.value.search?.trim();
    if (search) {
      this.alunoService.getAlunos().subscribe((response) => {
        this.alunosFiltrados = response.filter((aluno:Aluno) => {
          return (aluno.nome && aluno.nome.toLowerCase().includes(search.toLowerCase()) || 
          aluno.telefone && aluno.telefone.includes(search) || 
          aluno.email && aluno.email.includes(search));
        })
        this.alunosFiltrados.sort((a: any,b: any) => a.nome.localeCompare(b.nome));

        if (this.alunosFiltrados.length === 0) {
          this.notificacao.showDanger("Não foram encontrados registros de alunos com este nome, e-mail ou telefone.");
        }else{
          this.notificacao.showSuccess("Busca de alunos realizada com sucesso");
        }
      })
      
    } else {
      this.alunoService.getAlunos().subscribe((response) => {
        this.alunosFiltrados = response;
        this.alunosFiltrados.sort((a: any,b: any) => a.nome.localeCompare(b.nome));
        this.notificacao.showSuccess("A lista de alunos foi recarregada.");
      });
    
    }
  }
  editarAluno(id: any) {
    this.router.navigate([`alunos/${id}/editar`]);
  }

}
