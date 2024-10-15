import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { dataEntrarForm, dataEntrarResp } from '../../app-data/guest.data';
import { apiGuestEntrar } from '../routes/gf.api';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  flag_hasSession: BehaviorSubject<boolean>;
  data_session: dataEntrarResp = {username:'',rol:''};

  constructor(private http: HttpClient, private router: Router) {
    this.flag_hasSession = new BehaviorSubject(false);
  }

  addSession(username:string,password:string):Observable<dataEntrarResp> {
    let url: string = apiGuestEntrar;
    let form: dataEntrarForm = {username,password};
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<dataEntrarResp>(url, form, {headers:httpHeaders});
  }

}
