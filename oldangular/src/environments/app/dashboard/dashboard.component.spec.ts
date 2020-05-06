import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DocumentSearchComponent } from '../document-search/document-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DOCUMENTS } from '../mock-documents';
import { Service } from '../document.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let documentService;
  let getDocumentSpy;

  beforeEach(async(() => {
    documentService = jasmine.createSpyObj('Service', ['getDocuments']);
    getDocumentSpy = documentService.getDocuments.and.returnValue( of(DOCUMENTS) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        DocumentSearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: Service, useValue: documentService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Documents" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Documents');
  });

  it('should call documentService', async(() => {
    expect(getDocumentSpy.calls.any()).toBe(true);
    }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

});
