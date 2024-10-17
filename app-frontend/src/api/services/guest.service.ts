import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { apiGuestAddSesion } from '../routes/gf-api.paths';
import { DataAddSession, DataSession } from '../../data/guest.data';
import { pathAdminBoard, pathWorkerBoard } from '../../meta/app.paths';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  flag_hasSession: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataSession: DataSession = { username: '', role: '' };

  constructor(private http: HttpClient, private router: Router) { }

  addSession(form: DataAddSession): void {
    let url: string = apiGuestAddSesion;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<DataSession>(url, form, { headers }).subscribe({
      next: (value: DataSession) => {

        this.dataSession = value;
        this.flag_hasSession.next(true);

        if (value.role == 'worker') {
          this.router.navigate([pathWorkerBoard]);
        }
        else if (value.role == 'admin') {
          this.router.navigate([pathAdminBoard]);
        }
      },
      complete: () => {
      },
      error: (error) => {
        this.flag_hasSession.next(false);
      }
    });
  }

}
