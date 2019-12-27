import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpEventType } from '@angular/common/http';
import { retry, catchError , map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {


  SERVER_URL: string = "http://localhost:8000";
  constructor(private httpClient: HttpClient) { }

  public upload(data, userId) {
    let uploadURL = `${this.SERVER_URL}/documents/upload`;

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

}
