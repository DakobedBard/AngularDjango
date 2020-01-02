import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../document.service';
import { Document } from '../document';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  DJANGO_SERVER = 'http://127.0.0.1:8000'
  documents: any = [];
  form: FormGroup;
  filename
  response;
  imageURL;
  checkbox_list = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private uploadService: UploadService,
    private router: Router
    ) { }

    refresh(): void{

    }

    ngOnInit() {
      
    }

    onChange(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.form.get('profile').setValue(file);
      }
    }
      
    onSubmit() {
      const formData = new FormData();
      formData.append('file', this.form.get('profile').value);
      formData.append('name', this.form.get('name').value);
      formData.append('user', localStorage.getItem('currentUserID'));

      this.uploadService.uploadDocument(formData).subscribe(
        (res) => {
          this.response = res;
          this.imageURL = `${this.DJANGO_SERVER}${res.file}`;

        },
        (err) => {  
          console.log(err);
        }
      );
    }

  list_change(){
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.checkbox_list)) {
      if(value.checked)
      checked_count++;
    }
  }
}
