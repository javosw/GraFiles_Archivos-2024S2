import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//
import { Observable } from 'rxjs';
//
import { ModelGetSession } from '../../model/guest.model';
import { apiGuestAddWorker, apiGuestGetWorker, apiWorkerGetTrashFolder } from '../routes/gf-api.paths';
import { ModelTrashFolder } from '../../model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  getClient(username: string): Observable<any> {
    let form = { username };
    let url: string = apiGuestGetWorker;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, form, { headers });
  }

  addClient(username: string, password: string): Observable<any> {
    let url: string = apiGuestAddWorker;
    let form: ModelGetSession = { username, password }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, form, { headers });

  }

  getTrashFolder(): Observable<ModelTrashFolder> {
    let url: string = apiWorkerGetTrashFolder;

    return this.http.get<ModelTrashFolder>(url);
  }

}
