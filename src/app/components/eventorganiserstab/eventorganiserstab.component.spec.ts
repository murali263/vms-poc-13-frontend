import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventorganiserstabComponent } from './eventorganiserstab.component';

describe('EventorganiserstabComponent', () => {
  let component: EventorganiserstabComponent;
  let fixture: ComponentFixture<EventorganiserstabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventorganiserstabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventorganiserstabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
