import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './user'
import { retry, catchError } from 'rxjs/operators';
const httpOptions:any = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe:'response'
}; 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'http://localhost:8000/api/auth';
  constructor(private  httpClient:HttpClient) { }
  public loginUser(user){
    return this.httpClient.post(`${this.apiURL}/login/`,user, httpOptions);
  }

}