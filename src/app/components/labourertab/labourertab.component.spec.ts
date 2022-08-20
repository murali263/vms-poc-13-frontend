import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourertabComponent } from './labourertab.component';

describe('LabourertabComponent', () => {
  let component: LabourertabComponent;
  let fixture: ComponentFixture<LabourertabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabourertabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabourertabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
