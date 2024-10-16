import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataAddSession, DataSession } from '../../app-data/guest.data';
import { apiGuestAddClient, apiGuestAddSesion, apiGuestGetClient } from '../routes/gf.api';

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

  getClient(username:string):Observable<any>{
    let form = {username};
    let url: string = apiGuestGetClient;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, form, {headers});
  }

  addClient(username:string,password:string):Observable<any>{
    let url: string = apiGuestAddClient;
    let form:DataAddSession = {username,password}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(url, form, {headers});

  }

}
