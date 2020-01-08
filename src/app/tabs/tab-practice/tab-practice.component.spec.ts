import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPracticeComponent } from './tab-practice.component';

describe('TabPracticeComponent', () => {
  let component: TabPracticeComponent;
  let fixture: ComponentFixture<TabPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
