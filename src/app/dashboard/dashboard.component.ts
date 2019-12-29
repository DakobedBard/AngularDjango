import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../document.service';
import { Document } from '../document';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  documents: any = [];
  form: FormGroup;
  filename
  response;
  imageURL;
  private fileData = null;
  constructor(
    private route: ActivatedRoute,
    private documentService: Service,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private httpClient: HttpClient,

    ) { }

  ngOnInit() {
    this.getDocuments();
    this.form = this.formBuilder.group({
      file: ['']
    });
  };
  onChange(event) {
    this.fileData = <File>event.target.files[0];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename = file.name
      this.form.get('upload').setValue(file);
    }
  }

  getDocuments(): void {
    const id = localStorage.getItem('currentUserID')
    console.log("I got documents " + id);
    this.documentService.getDocuments(id)
      .subscribe((data => {
        for (const d of (data as any)) {
          this.documents.push({
            name: d.name,

          });
        }
    }))
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.form.get('upload').value);
    this.documentService.createDocument(formData).subscribe(
      (res) => {

        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    )};
}
