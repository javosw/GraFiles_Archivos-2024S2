import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//
import { Observable } from 'rxjs';
//
import { ModelGetSession, ModelRole } from '../../model/guest.model';
import { apiAdminAddUser, apiAdminCheckUser, apiWorkerGetTrashFolder } from '../routes/gf-api.paths';
import { ModelTrashFolder } from '../../model/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  checkUser(body: { username: string }): Observable<any> {
    let url: string = apiAdminCheckUser;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers });
  }

  addUser(body: { username: string, password: string, role: ModelRole }): Observable<any> {
    let url: string = apiAdminAddUser;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers });

  }

  getTrashFolder(): Observable<ModelTrashFolder> {
    let url: string = apiWorkerGetTrashFolder;

    return this.http.get<ModelTrashFolder>(url);
  }

}
