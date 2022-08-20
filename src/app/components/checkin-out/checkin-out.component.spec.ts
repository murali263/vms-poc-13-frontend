import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinOutComponent } from './checkin-out.component';

describe('CheckinOutComponent', () => {
  let component: CheckinOutComponent;
  let fixture: ComponentFixture<CheckinOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
