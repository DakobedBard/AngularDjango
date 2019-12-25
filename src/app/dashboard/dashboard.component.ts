import { Component, OnInit } from '@angular/core';

import { Service } from '../document.service';
import { Document } from '../document';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  documents: any = [];

  constructor(private documentService: Service) { }

  ngOnInit() {
    this.getDocuments();
  };

  getDocuments(): void {
    this.documentService.getDocuments()
      .subscribe((data => {
        for (const d of (data as any)) {
          this.documents.push({
            name: d.name,
            price: d.price
          });
        }
    }))
  }
}
