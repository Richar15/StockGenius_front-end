import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router

  if (authService.isLoggedIn()) {
    return true; // Permite el acceso si está autenticado
  } else {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }
};
