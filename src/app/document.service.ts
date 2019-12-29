import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Document } from './document';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class Service {

  private documentsUrl = 'http://localhost:8000/documents/list/1';  // URL to web api
  documents: any = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET documents from the server */

  getDocuments(id: any) {
    return this.http.get(this.documentsUrl);
    // return this.http.get(this.documentsUrl+'?id=1');
  }


  /** GET document by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Document> {
    const url = `${this.documentsUrl}?id=${id}`;
    return this.http.get<Document[]>(url)
      .pipe(
        map(documents => documents[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Document>(`getDocument id=${id}`))
      );
  }

  /** GET document by id. Will 404 if id not found */
  getDocument(id: number): Observable<Document> {
    const url = `${this.documentsUrl}/${id}`;
    return this.http.get<Document>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Document>(`getDocument id=${id}`))
    );
  }

  /* GET documentsUrl whose name contains search term */
  searchDocuments(term: string): Observable<Document[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Document[]>(`${this.documentsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found documents matching "${term}"`)),
      catchError(this.handleError<Document[]>('searchDocument', []))
    );
  }

  //////// Save methods //////////
  /** POST: add a new document to the server */
  addDocument (document: Document): Observable<Document> {
    return this.http.post<Document>(this.documentsUrl, document, this.httpOptions).pipe(
      tap((newDocument: Document) => this.log(`added document w/ id=${newDocument.id}`)),
      catchError(this.handleError<Document>('addDocument'))
    );
  }

  /** DELETE: delete the document from the server */
  deleteDocument (document: Document | number): Observable<Document> {
    const id = typeof document === 'number' ? document : document.id;
    const url = `${this.documentsUrl}/${id}`;

    return this.http.delete<Document>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted document id=${id}`)),
      catchError(this.handleError<Document>('deleteDocument'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DocumentService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Service: ${message}`);
  }
}
