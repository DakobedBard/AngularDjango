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
  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  DJANGO_SERVER = 'http://127.0.0.1:8000'
  documents: any = [];
  form: FormGroup;
  deleteForm: FormGroup;
  isSubmitted  =  false;
  filename
  response;
  imageURL;
  checkbox_list = [];
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
        profile: [''],
        name: ['']
      });
      this.deleteForm = this.formBuilder.group({
        profile: [''],
        name: ['']
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


  getDocuments(): void {
    const id = localStorage.getItem('currentUserID')
    console.log("I got documents " + id);
    this.uploadService.getDocuments(id)
      .subscribe((data => {
        for (const d of (data as any)) {
          this.documents.push({
            file: d.file,
          });
          this.checkbox_list.push({
            name: d.name,
            id: d.id,
            disabled: false,
            checked: false,
            labelPosition: "after"
          })

        }
    }))
  }
  onDelete(){
    console.log("I get called!");
    for (let value of Object.values(this.checkbox_list)) {
      if(value.checked){
        console.log("Document " + value.id + " is to be deleted" )
        this.uploadService.delete(value.id).subscribe(
          (res) => {
            console.log()
          },
          (err) => {  
            console.log(err);
          }
        );
      }
    }
  }

  master_change() {
    for (let value of Object.values(this.checkbox_list)) {
      value.checked = this.master_checked;
    }
  }
 
  list_change(){
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.checkbox_list)) {
      if(value.checked)
      checked_count++;
    }
 
    if(checked_count>0 && checked_count<this.checkbox_list.length){
      // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
      this.master_indeterminate = true;
    }else if(checked_count == this.checkbox_list.length){
      //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
      this.master_indeterminate = false;
      this.master_checked = true;
    }else{
      //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
      this.master_indeterminate = false;
      this.master_checked = false;
    }
  }
}
