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
  constructor(private loginService: LoginService, private formBuilder: FormBuilder,private router: Router ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
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
    this.loginService.loginUser(user).pipe(
      
    )
      .subscribe(
      response => { console.log("You have been logged in as " + user.email);this.dataSaved = true;
      this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
      }
    )
  }

}




  


