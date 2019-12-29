import { Component, OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import {User} from '../user'
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: Array<Object>;
  loginForm: FormGroup;
  isSubmitted  =  false;
  dataSaved = false;
  jsondata;
  loginResponse;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder,private router: Router ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get formControls() { return this.loginForm.controls; }

  login(){
    this.dataSaved = false;
    this.isSubmitted= true;
    let user = this.loginForm.value
    this.loginUser(user);
    
    this.getUserID(user);
    this.router.navigate(['/dashboard/1'])
  }
  getUserID(user:User){
    this.loginService.userID(user)
      .subscribe(data => {
        let resp= JSON.parse(JSON.stringify(data)); 

      })
  }

  loginUser(user:User){
    this.loginResponse = this.loginService.loginUser(user)
      .subscribe(
        data => {
          let id = localStorage.getItem('currentUserID');
        },
        error => {console.log(error);
      }
    )

  }

}




  


