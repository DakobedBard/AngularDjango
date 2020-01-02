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
