import { HttpInterceptorFn } from '@angular/common/http';

export const credsInterceptor: HttpInterceptorFn = (req, next) => {
  return next( req.clone({withCredentials: true}) );
};
