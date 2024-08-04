import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarGrupoAcoes } from '../../interfaces/sidebar-grupo-acoes';
import { LoginService } from '../../services/login/login.service';
import { LoginStore } from '../../store/login/Login.store';
import { usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../services/notificacao/notificacao.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() name?: string;
  grupoAcoes: Array<SidebarGrupoAcoes> = []
  constructor(
    private loginService: LoginService,
    private loginStore: LoginStore,
    private router: Router,
    private notificacao: NotificacaoService
  ) {

    let usuario = null
    usuario = this.loginStore.get()
    if(usuario.id == ''){
      this.router.navigate(['login'])
    }
    
    let perfilUsuario = usuario.perfil;

    this.grupoAcoes =[
      {
        acoes: [
          {
            titulo: "inicio geral",
            url: 'home',
            perfil: ['docente', 'admin']
          },
          {
            titulo: "inicio Aluno",
            url: `alunos/${usuario.id}`,
            perfil: ['aluno']
          }
        ],
        titulo: "",
        perfil: ['aluno', 'docente', 'admin']
      }, 
      {
        acoes: [
          {
            titulo: "Cadastro Aluno",
            url: '/alunos/cadastrar',
            perfil: ['admin']
          },
          {
            titulo: "Cadastro Docente",
            url: '/docentes/cadastrar',
            perfil: ['admin']
          },
          {
            titulo: "Cadastro Turma",
            url: '/turmas',
            perfil: ['admin']
          },
          {
            titulo: "Cadastro Avaliação",
            url: '/notas',
            perfil: ['docente', 'admin']
          }
        ],
        titulo: "Cadastro",
        perfil: ['docente', 'admin']
      },
      {
        acoes: [
          {
            titulo: "Notas do Aluno",
            url: `/alunos/${usuario.id}/notas`,
            perfil: ['aluno']
          },
          {
            titulo: "Lista de Docentes",
            url: 'docentes',
            perfil: ['docente', 'admin']
          }
        ],
        titulo: "Detalhamento",
        perfil: ['docente', 'admin','aluno']
      },
  
    ]

    this.grupoAcoes = this.grupoAcoes.filter( (item) => {
      let acesso = item.perfil.includes(perfilUsuario)
      if(acesso){
        item.acoes = item.acoes.filter((acao) => acao.perfil.includes(perfilUsuario))
      }
      return acesso 
    })



  

  }
  logout() {
    this.loginStore.delete()
    this.loginService.logout()
    this.notificacao.showSuccess("Logout realizado com sucesso")
    this.activeOffcanvas.dismiss('Cross click')
  }
}
