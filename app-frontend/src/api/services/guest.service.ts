import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { apiGuestAddSesion } from '../routes/gf.api';
import { DataAddSession, DataSession } from '../../data/guest.data';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  flag_hasSession: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataSession: DataSession = {username:'',rol:''};

  constructor(private http: HttpClient, private router: Router) {
  }

  addSession(username:string,password:string):Observable<DataSession> {
    let url: string = apiGuestAddSesion;
    let form: DataAddSession = {username,password};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DataSession>(url, form, {headers});
  }


}
