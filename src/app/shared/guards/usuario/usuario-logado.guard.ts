import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginStore } from '../../store/login/Login.store';

export const usuarioLogadoGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginStore = inject(LoginStore);

  if (loginStore.get()?.id) {
    console.log("guest")
    return true
  } else {
    console.log("error")
    router.navigate(['/login']);
    return false;
  }
};