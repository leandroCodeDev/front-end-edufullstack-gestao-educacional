import { Routes } from '@angular/router';
import { usuarioLogadoGuard } from './shared/guards/usuario/usuario-logado.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import("./page/login/login.component").then(c => c.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () => import("./page/home/home.component").then(c => c.HomeComponent),
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'docentes',
    canActivate: [usuarioLogadoGuard],
    children: [
      {
        path:'',
        loadComponent: () => import("./page/lista-docente/lista-docente.component").then(c => c.ListaDocenteComponent),
      },
      {
        path:'cadastrar',
        loadComponent: () => import("./page/docente/docente.component").then(c => c.DocenteComponent),
      },
      {
        path:':id/editar',
        loadComponent: () => import("./page/docente/docente.component").then(c => c.DocenteComponent),
      },

    ]
  },
  {
    path: 'notas',
    canActivate: [usuarioLogadoGuard],
    children: [
      {
        path:'',
        loadComponent: () => import("./page/nota/nota.component").then(c => c.NotaComponent),
      },
      {
        path:':id',
        loadComponent: () => import("./page/nota/nota.component").then(c => c.NotaComponent),
      }

    ]
  },
  {
    path: 'turmas',
    loadComponent: () => import("./page/turma/turma.component").then(c => c.TurmaComponent),
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'alunos',
    canActivate: [usuarioLogadoGuard],
    children: [
      {
        path: 'cadastrar',
        loadComponent: () => import("./page/aluno/aluno.component").then(c => c.AlunoComponent),
      },
      {
        path: ':id',
        loadComponent: () => import("./page/aluno-home/aluno-home.component").then(c => c.AlunoHomeComponent),
      },
      {
        path: ':id/notas',
        loadComponent: () => import("./page/notas-aluno/notas-aluno.component").then(c => c.NotasAlunoComponent),
      },
      {
        path: ':id/editar',
        loadComponent: () => import("./page/aluno/aluno.component").then(c => c.AlunoComponent),
      },

    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
