import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseLoanOfferComponent } from './house-loan-offer.component';

describe('HouseLoanOfferComponent', () => {
  let component: HouseLoanOfferComponent;
  let fixture: ComponentFixture<HouseLoanOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseLoanOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseLoanOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
