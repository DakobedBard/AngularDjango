import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private  httpClient:HttpClient) { }
  register(email:string, username:string, password:string ){
    console.log(email)
  }
}
