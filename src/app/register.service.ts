import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
const headers = new HttpHeaders({
  'Content-Type': 'application/applicat/json'
});
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiURL: string = 'http://localhost:8000/api/auth';
  constructor(private  httpClient:HttpClient) { }
  public createUser(user: User){
    return this.httpClient.post(`${this.apiURL}/register/`,user, {headers:headers});
}
}