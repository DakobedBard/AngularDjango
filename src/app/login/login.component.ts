import { Component, OnInit } from '@angular/core';
import { FormGroup,ReactiveFormsModule, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import {User} from '../user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  dataSaved = false;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get formControls() { return this.loginForm.controls; }
  register(){
    this.dataSaved = false;
    this.isSubmitted= true;
    let user = this.loginForm.value
    this.loginUser(user);
  }

  login(){
    this.dataSaved = false;
    this.isSubmitted= true;
    let user = this.loginForm.value
    this.loginUser(user);
  }
  
  loginUser(user:User){
    this.loginService.loginUser(user).subscribe(
      user => { console.log(user);this.dataSaved = true;
      },
      err => {
        console.log(err);
      }
    )
  }

}




  


