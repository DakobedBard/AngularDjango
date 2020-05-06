import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowlComponent } from './howl.component';

describe('HowlComponent', () => {
  let component: HowlComponent;
  let fixture: ComponentFixture<HowlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
