import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { apiGuestAddSesion } from '../routes/gf-api.paths';
import { DataAddSession, DataSession, Role } from '../../data/guest.data';
import { pathAdminBoard, pathWorkerBoard } from '../../meta/app.paths';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  hasSession: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataSession: DataSession = { username: '', role: '' };

  constructor(private http: HttpClient, private router: Router) { }

  getSession(form: DataAddSession): void {
    let url: string = apiGuestAddSesion;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<DataSession>(url, form, { headers }).subscribe({
      next: (value: DataSession) => {

        this.dataSession = value;
        this.hasSession.next(true);

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
        this.hasSession.next(false);
      }
    });
  }

  testSession(role: Role | null) {
    let url:string = '';
    if(!role) url = 'http://localhost:3000/test-roles';
    else if(role == 'admin') url = 'http://localhost:3000/test-admin';
    else if(role == 'guest') url = 'http://localhost:3000/test-guest';
    else if(role == 'worker') url = 'http://localhost:3000/test-worker';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get<any>(url,{ headers }).subscribe({
      next: (value: any) => {
        alert('OK='+role);
      },
      error: (error: any) => {
        alert('ERR='+role);
      }
    });
  }
}

