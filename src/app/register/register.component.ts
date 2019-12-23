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
    console.log(this.registerForm.value);
    this.isSubmitted = true;
    if(this.registerForm.invalid){
      console.log(this.registerForm.get('email').value)
      return;
    }
    
  }

}
