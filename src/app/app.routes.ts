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
        path:'cadastro',
        loadComponent: () => import("./page/docente/docente.component").then(c => c.DocenteComponent),
      },
      {
        path:'editar/:id',
        loadComponent: () => import("./page/docente/docente.component").then(c => c.DocenteComponent),
      },

    ]
  },
  {
    path: 'notas',
    loadComponent: () => import("./page/nota/nota.component").then(c => c.NotaComponent),
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'turmas',
    loadComponent: () => import("./page/turma/turma.component").then(c => c.TurmaComponent),
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'turmas',
    loadComponent: () => import("./page/turma/turma.component").then(c => c.TurmaComponent),
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
