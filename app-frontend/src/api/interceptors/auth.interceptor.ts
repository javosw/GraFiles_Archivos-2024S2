import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
//
import { GuestService } from '../services/guest.service';
import { apiGuestAddSesion } from '../routes/gf-api.paths';
import { pathMain } from '../../meta/app.paths';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  let router: Router = inject(Router);
  let guestService: GuestService = inject(GuestService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let constr401: boolean = error.status == 401;
      let constrUser: boolean = req.url != apiGuestAddSesion;
      if (constr401 && constrUser) {
        router.navigate([pathMain]);
        guestService.hasSession.next(false);
        guestService.dataGetSessionOk.next(null);
      }

      return throwError(() => error);
    })
  );
};
