import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLoanOfferComponent } from './car-loan-offer.component';

describe('CarLoanOfferComponent', () => {
  let component: CarLoanOfferComponent;
  let fixture: ComponentFixture<CarLoanOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarLoanOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarLoanOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
