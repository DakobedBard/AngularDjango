import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLineComponent } from './tab-line.component';

describe('TabLineComponent', () => {
  let component: TabLineComponent;
  let fixture: ComponentFixture<TabLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
