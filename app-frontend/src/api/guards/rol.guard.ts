import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { GuestService } from '../services/guest.service';

export const rolGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  alert('rolGuard='+inject(GuestService).flag_hasSession.getValue());
  return inject(GuestService).flag_hasSession.getValue() ? true : inject(Router).createUrlTree(['/ajajajaj']);
};
