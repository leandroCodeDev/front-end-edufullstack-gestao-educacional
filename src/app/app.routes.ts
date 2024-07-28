import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'docentes',
        loadComponent: () => import("./page/docente/docente/docente.component").then(c => c.DocenteComponent),
      },
      {
        path: '**',
        redirectTo: '/'
      }
];
