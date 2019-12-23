import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Document } from '../document';
import { Service } from '../document.service';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: [ './document-search.component.css' ]
})
export class DocumentSearchComponent implements OnInit {
  documents$: Observable<Document[]>;
  private searchTerms = new Subject<string>();

  constructor(private documentService: Service) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.documents$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.documentService.searchDocuments(term)),
    );
  }
}
