import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { pathMain } from '../../meta/app.paths';

export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(GuestService).hasSession.getValue() ? true : inject(Router).createUrlTree([pathMain]);
};
