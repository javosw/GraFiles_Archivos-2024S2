import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//
import { Observable } from 'rxjs';
//
import { ModelFolder } from '../../model/worker.model';
import { apiWorkerAddFile, apiWorkerAddFolder, apiWorkerGetFolder } from '../routes/gf-api.paths';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient, private router: Router) { }

  getFolder(body: { _id: string }): Observable<ModelFolder> {
    let url: string = apiWorkerGetFolder;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<ModelFolder>(url, body, { headers });
  }

  getFile() {
  }

  addFolder(body: { ancestor: string, name: string }): Observable<{ _id: string }> {
    let url: string = apiWorkerAddFolder;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<{ _id: string }>(url, body, { headers });
  }

  addFile(ancestor: string, file: File): Observable<{ _id: string }> {
    let url: string = apiWorkerAddFile;
    const body = new FormData();
    body.append('ancestor', ancestor);
    body.append('file', file);

    return this.http.post<{ _id: string }>(url, body);
  }

}
