import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service'
import { FormGroup,ReactiveFormsModule, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted  =  false;
  constructor(private registerService: RegisterService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get formControls() { return this.registerForm.controls; }
  register(){

    this.isSubmitted = true;
    
    if(this.registerForm.invalid){
      this.registerService.register(this.registerForm.value.email,this.registerForm.value.username,this.registerForm.value.password);
      return;
    }
    else{
      this.registerService.register(this.registerForm.value.email,this.registerForm.value.username,this.registerForm.value.password);
    }
    
  }

}
