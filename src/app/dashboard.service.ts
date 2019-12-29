import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './user'
import { retry, catchError } from 'rxjs/operators';
import { Document } from './document'
const httpOptions:any = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe:'response'
  }; 
@Injectable({
    providedIn: 'root'
  })
export class DashboardService {
    apiURL: string = 'http://localhost:8000/documents/create';
    constructor(private  httpClient:HttpClient) { }
    createDocument(document){
        return this.httpClient.post(`${this.apiURL}/`,document, httpOptions);
    }
}