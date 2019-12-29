import { Component, OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import {User} from '../user'
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
    
  }
  
  loginUser(user:User){
    this.loginResponse = this.loginService.loginUser(user).pipe(
      
    )
      .subscribe(
        data => {console.log("Thge data is " + data)},
        error => {console.log(error);
      }
    )
    console.log("The login repsonse is " + this.loginResponse)
  }

}




  


