import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = "http://localhost:8000/api/auth/register/"
  constructor(private  httpClient:HttpClient) { }

  createUser(user: User): Observable<User> {
    let httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json');   
    let options = {
        headers: httpHeaders
    };        
    return this.httpClient.post<User>(this.url, user, options);
  }
}