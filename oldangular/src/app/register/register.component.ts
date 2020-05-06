import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service'
import { FormGroup,ReactiveFormsModule, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';
import {User} from '../user'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted  =  false;
  dataSaved = false;
  constructor(private registerService: RegisterService, private formBuilder: FormBuilder,private router: Router ) { }

  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }
  get formControls() { return this.registerForm.controls; }
  register(){
    this.dataSaved = false;
    this.isSubmitted= true;
    let user = this.registerForm.value
    this.registerUser(user);
  }
  
  registerUser(user:User){
    this.registerService.createUser(user).subscribe(
      user => { console.log(user);this.dataSaved = true;
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    )
  }
  

}
