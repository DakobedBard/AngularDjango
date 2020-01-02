import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackgridComponent } from './trackgrid.component';

describe('TrackgridComponent', () => {
  let component: TrackgridComponent;
  let fixture: ComponentFixture<TrackgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
