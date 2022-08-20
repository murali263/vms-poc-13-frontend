import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitoridcardComponent } from './visitoridcard.component';

describe('VisitoridcardComponent', () => {
  let component: VisitoridcardComponent;
  let fixture: ComponentFixture<VisitoridcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitoridcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitoridcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
