import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Document } from './document';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class Service {
  private createDocumentURL: string = 'http://localhost:8000/documents/create';
  private documentsUrl = 'http://localhost:8000/documents';  // URL to web api
  documents: any = [];
  httpOptions:any = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe:'response'
  }; 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET documents from the server */

  getDocuments(id: any) {
    console.log("id " + id)
    return this.http.get(this.documentsUrl+'/list/'+id);
    // return this.http.get(this.documentsUrl+'?id=1');
  }

  createDocument(document:Document){

    return this.http.post(`${this.createDocumentURL}/`,document, this.httpOptions);
  
  }

}
