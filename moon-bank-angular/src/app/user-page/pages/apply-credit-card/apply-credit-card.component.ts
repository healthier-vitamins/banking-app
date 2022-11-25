import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-apply-credit-card',
  templateUrl: './apply-credit-card.component.html',
  styleUrls: ['./apply-credit-card.component.css'],
})
export class ApplyCreditCardComponent implements OnInit {
  offer!: Offer;

  constructor(
    private cookieService: CookieService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.getOffer();
  }

  getOffer() {
    const bankAccId = this.cookieService.get('id');
    this.offerService.getCreditCardOffer(Number(bankAccId)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.offer = res as Offer;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Bank account id does not exist.');
        } else if (err.status === 406) {
          alert('Something is wrong with account balance.');
        } else {
          console.log(err);
          alert('Something went wrong with fetching credit card offer data.');
        }
      },
    });
  }
}
