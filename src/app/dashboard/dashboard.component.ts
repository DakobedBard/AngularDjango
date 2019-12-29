import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../document.service';
import { Document } from '../document';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const httpOptions:any = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe:'response'
}; 
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
  constructor(
    private route: ActivatedRoute,
    private documentService: Service,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.getDocuments();
    this.form = this.formBuilder.group({
      uploadfile: ['']
    });
  };
  onChange(event) {

    console.log("ererer")
    if (event.target.files.length > 0) {
      console.log("ererer")
      const file = event.target.files[0];
      this.filename = file.name
      this.form.get('uploadfile').setValue(file);
    }
  }

  getDocuments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
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
    formData.append('uploadfile', this.form.get('uploadfile').value);
    formData.append('bucket', 'basedjango');
    formData.append('user', "2");
    formData.append("type","image");
    formData.append("name","firstupload");
    formData.append("extension","jpeg");
    formData.append("s3Path", "none")
    this.dashboardService.createDocument(formData).subscribe(
      (res) => {
        this.response = res;
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    )};
}
