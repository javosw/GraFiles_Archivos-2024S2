import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiGuestAddClient, apiGuestGetClient } from '../routes/gf-api.paths';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataAddSession } from '../../data/guest.data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }


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

