import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  DJANGO_SERVER: string = "localhost:8000";
  constructor(private http: HttpClient) { }
  public upload(formData){
    return this.http.post<any>('${this.DJNAGO_SERVER}/upload',formData)
  }
}
