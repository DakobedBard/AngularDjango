import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Document }         from '../document';
import {Service }  from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: [ './document-detail.component.css' ]
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;

  constructor(
    private route: ActivatedRoute,
    private documentService: Service,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDocument();
  }

  getDocument(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.documentService.getDocument(id)
      .subscribe(document => this.document = document);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.documentService.updateDocument(this.document)
      .subscribe(() => this.goBack());
  }
}
