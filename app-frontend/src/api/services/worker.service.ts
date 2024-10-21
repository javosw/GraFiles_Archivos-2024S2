import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//
import { Observable } from 'rxjs';
//
import { ModelFolder } from '../../model/worker.model';
import { apiWorkerAddFolder, apiWorkerGetFolder } from '../routes/gf-api.paths';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient, private router: Router) { }

  addFolder(body: { ancestor: string; name: string }): Observable<string> {
    let url: string = apiWorkerAddFolder;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<string>(url, body, { headers });

  }

  getFolder(body: { _id: string }): Observable<ModelFolder> {
    let url: string = apiWorkerGetFolder;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<ModelFolder>(url, body, { headers });
  }

  getFile() {

  }
}
