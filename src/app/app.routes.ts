import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'docentes',
        loadComponent: () => import("./page/docente/docente.component").then(c => c.DocenteComponent),
      },
      {
        path: 'notas',
        loadComponent: () => import("./page/nota/nota.component").then(c => c.NotaComponent),
      },
      {
        path: 'turmas',
        loadComponent: () => import("./page/turma/turma.component").then(c => c.TurmaComponent),
      },
      {
        path: '**',
        redirectTo: ''
      }
];
