import { Component, OnInit } from '@angular/core';

import { Service } from '../document.service';
import { Document } from '../document';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: Service) { }

  ngOnInit() {
    this.getDocuments();
  }

  getDocuments(): void {
    this.documentService.getDocuments()
      .subscribe(documents => this.documents = documents.slice(1, 5));
  }
}
