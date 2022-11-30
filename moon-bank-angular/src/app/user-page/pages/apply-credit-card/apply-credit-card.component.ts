import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-apply-credit-card',
  templateUrl: './apply-credit-card.component.html',
  styleUrls: ['./apply-credit-card.component.css'],
})
export class ApplyCreditCardComponent implements OnInit {
  offer!: Offer;
  bankAccId!: string;
  hasApplied: boolean = false;

  constructor(
    private cookieService: CookieService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.getBankAccId();
    this.hasCreditCard();
    this.getOffer();
  }

  getOffer() {
    this.offerService.getCreditCardOffer(Number(this.bankAccId)).subscribe({
      next: (res: any) => {
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

  applyCreditCard() {
    this.offerService
      .getCustId(Number(this.bankAccId))
      .pipe(
        finalize(() => {
          this.applyHelper();
        })
      )
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          this.offer.custId = res;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            console.log(err);
            alert(err.message);
          }
          console.log(err);
          alert(err.message);
        },
      });
  }

  applyHelper() {
    this.offerService.applyCreditCardOffer(this.offer).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.hasApplied = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert('Something went wrong, please try again later.');
      },
    });
  }

  getBankAccId() {
    this.bankAccId = this.cookieService.get('id');
  }

  hasCreditCard() {
    this.offerService.hasCreditCardOffer(Number(this.bankAccId)).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.hasApplied = res;
      },
    });
  }

  isDisabled() {
    if (this.hasApplied) {
      return {
        'background-color': 'grey',
      };
    }
    return;
  }
}
