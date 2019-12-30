import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../document.service';
import { Document } from '../document';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  private fileData = null;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private uploadService: UploadService

    ) { }

    ngOnInit() {
      this.getDocuments()
      this.form = this.formBuilder.group({
        profile: ['']
      });
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
  
      this.uploadService.upload(formData).subscribe(
        (res) => {
          this.response = res;
          this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
            console.log(res);
            console.log(this.imageURL);
        },
        (err) => {  
          console.log(err);
        }
      );
    }

  getDocuments(): void {
    const id = localStorage.getItem('currentUserID')
    console.log("I got documents " + id);
    this.uploadService.getDocuments(id)
      .subscribe((data => {
        for (const d of (data as any)) {
          this.documents.push({
            file: d.file,
          });
        }
    }))
  }
}
