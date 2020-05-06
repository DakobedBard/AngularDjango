import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../user'
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router'
import {LoginResponse} from './login-response';
import {Observable} from'rxjs';

const httpOptions:any = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe:'response',
}; 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'http://localhost:8000/api/token';
  loginURL: string = 'http://localhost:8000/api/auth/login';
  constructor(private  httpClient:HttpClient, private router:Router) { }
  currentUser;
  public loginUser(user):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${this.apiURL}/`,user,<Object> httpOptions).pipe(
      tap(data => {
        this.storeTokens(data);
      }  
    ));

  }
  private storeTokens(tokens){
    let obj = JSON.parse(JSON.stringify(tokens));
    localStorage.setItem('access',obj.body.access)
    localStorage.setItem('refresh',obj.body.refresh)
  }
  public userID(user){
    console.log(" user " + user.username)
    return this.httpClient.get<User>(`${this.loginURL}/?username=${user.username}`).pipe(
      tap(data => {
        let obj = JSON.parse(JSON.stringify(data));
        localStorage.setItem('currentUserID',JSON.stringify(obj.userid));  
      })
    )


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