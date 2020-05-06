import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  DJANGO_SERVER = 'http://127.0.0.1:8000'
  documents: any = [];
  checkbox_list = [];
  constructor( private uploadService: UploadService,) { }
  ngOnInit() {
    this.getDocuments()

  }

  getDocuments(): void {
    const id = localStorage.getItem('currentUserID')
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
    for (let value of Object.values(this.checkbox_list)) {
      if(value.checked){
        this.uploadService.delete(value.id).subscribe(
          (res) => {
            this.getDocuments()
            console.log(res)
          },
          (err) => {  
            console.log(err);
          }
        );
      }
    }

    this.ngOnInit();
  }


}
