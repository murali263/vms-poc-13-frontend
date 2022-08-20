import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralvisitortabComponent } from './generalvisitortab.component';

describe('GeneralvisitortabComponent', () => {
  let component: GeneralvisitortabComponent;
  let fixture: ComponentFixture<GeneralvisitortabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralvisitortabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralvisitortabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
