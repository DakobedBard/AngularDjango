import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { CdkStepperNext } from '@angular/cdk/stepper';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req,next){

    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:'Bearer ' + this.getToken()
      }
    })

  return next.handle(tokenizedReq)
  }
  getToken() {
    return localStorage.getItem('access')
  }
  getRefreshToken() {
    return localStorage.getItem('refresh')
  }
  constructor() { }
}
