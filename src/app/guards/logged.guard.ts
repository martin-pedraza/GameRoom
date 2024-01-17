import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { CanActivateFn, Router } from '@angular/router';

export const LoggedUserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const { logged } = userService;

  if (!logged) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
