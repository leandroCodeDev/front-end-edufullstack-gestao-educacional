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
        path: '**',
        redirectTo: ''
      }
];
