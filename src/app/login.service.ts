import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './user'
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'http://localhost:8000/api/auth';
  constructor(private  httpClient:HttpClient) { }
  public loginUser(user: User){
    return this.httpClient.post(`${this.apiURL}/login/`,user, {headers:headers});
}
}