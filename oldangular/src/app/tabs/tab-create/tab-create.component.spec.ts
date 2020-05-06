import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCreateComponent } from './tab-create.component';

describe('TabCreateComponent', () => {
  let component: TabCreateComponent;
  let fixture: ComponentFixture<TabCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
