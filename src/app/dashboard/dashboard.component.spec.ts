import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DocumentSearchComponent } from '../document-search/document-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Service } from '../document.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let documentService;
  let getDocumentSpy;

});
