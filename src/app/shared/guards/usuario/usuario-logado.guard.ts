import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginStore } from '../../store/login/Login.store';

export const usuarioLogadoGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginStore = inject(LoginStore);

  return true
  if (loginStore.get().id) {
    return true
  } else {
    router.navigate(['/login']);
    return false;
  }
};