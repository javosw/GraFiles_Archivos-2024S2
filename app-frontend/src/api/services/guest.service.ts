import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//
import { apiGuestAddSesion } from '../routes/gf-api.paths';
import { ModelGetSession, ModelGetSessionOk, ModelRole } from '../../model/guest.model';
import { pathAdminBoard, pathWorkerBoard } from '../../meta/app.paths';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  hasSession: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataGetSessionOk = new BehaviorSubject<ModelGetSessionOk | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  getSession(form: ModelGetSession): void {
    let url: string = apiGuestAddSesion;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<ModelGetSessionOk>(url, form, { headers }).subscribe({
      next: (value: ModelGetSessionOk) => {
        this.hasSession.next(true);
        this.dataGetSessionOk.next(value);

        if (value.role == 'worker') {
          this.router.navigate([pathWorkerBoard]);
        }
        else if (value.role == 'admin') {
          this.router.navigate([pathAdminBoard]);
        }
      },
      error: (error) => {
        this.hasSession.next(false);
        this.dataGetSessionOk.next(null);
      }
    });
  }
}

