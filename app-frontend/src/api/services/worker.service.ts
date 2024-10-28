import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//
import { Observable } from 'rxjs';
//
import { ModelFile, ModelFolder, SharedFolder } from '../../model/worker.model';
import { apiWorkerAddFile, apiWorkerAddFolder, apiWorkerDelFile, apiWorkerGetFile, apiWorkerGetFolder, apiWorkerGetSharedFolder, apiWorkerShareFile } from '../routes/gf-api.paths';

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

  getSharedFolder(body: { _id: string }): Observable<SharedFolder> {
    let url: string = apiWorkerGetSharedFolder;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<SharedFolder>(url, body, { headers });
  }

  getFile(body: { _id: string }): Observable<ModelFile> {
    let url: string = apiWorkerGetFile;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<ModelFile>(url, body, { headers });
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

  shareFile(body: { idFile: string, fromUser: string, toUser: string }) {
    let url: string = apiWorkerShareFile;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers });
  }

  delFile(body: { idFile: string }) {
    let url: string = apiWorkerDelFile;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers });
  }

  /*
  ObjectId(inputId: string): ObjectId
  Create ObjectId from a 24 character hex string.
  
  (method) ObjectId.toString(encoding?: "hex" | "base64"): string
  Converts the id into a 24 character hex string for printing, unless encoding is provided.
  */

}
