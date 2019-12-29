import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './user'
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
import {LoginResponse} from './login-response';
import {Observable} from'rxjs';
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
  apiURL: string = 'http://localhost:8000/api/token';
  constructor(private  httpClient:HttpClient, private router:Router) { }

  public loginUser(user):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${this.apiURL}/`,user,<Object> httpOptions);
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login/'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

}