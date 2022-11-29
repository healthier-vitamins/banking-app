import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { BankAccount } from 'src/app/models/bank-account';
import { Offer } from 'src/app/models/offer';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-apply-credit-card',
  templateUrl: './apply-credit-card.component.html',
  styleUrls: ['./apply-credit-card.component.css'],
})
export class ApplyCreditCardComponent implements OnInit {
  offer!: Offer;
  bankAccId!: string;
  bankAcc!: BankAccount;
  appliedLogic: boolean = false;

  constructor(
    private cookieService: CookieService,
    private offerService: OfferService,
    private bankAccService: BankAccountService
  ) {}

  ngOnInit(): void {
    this.getBankAccId();
    this.getBankAcc();
    this.getOffer();
  }

  getOffer() {
    this.offerService.getCreditCardOffer(Number(this.bankAccId)).subscribe({
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
    this.offerService
      .applyCreditCardOffer(this.offer)
      // .pipe(
      //   finalize(() => {
      //     this.isApplied();
      //   })
      // )
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          alert('Something went wrong, please try again later.');
        },
      });
  }

  getBankAcc() {
    this.bankAccService.getAccById(Number(this.bankAccId)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.bankAcc = res as BankAccount;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert(err.message);
          console.log(err);
        }
        console.log(err);
        alert('Something went wrong, please try again later.');
      },
    });
  }

  getBankAccId() {
    this.bankAccId = this.cookieService.get('id');
  }

  // isApplied() {
  //   const listOfOffers = this.bankAcc.customer!.offers;
  //   console.log(listOfOffers);
  //   if (listOfOffers?.length === 0) this.appliedLogic = false;
  //   if (listOfOffers?.length === 1 && listOfOffers[0] === 'Credit Card')
  //     this.appliedLogic = true;
  //   for (let i = 0; i < listOfOffers!.length; i++) {
  //     if (listOfOffers![i] === 'Credit Card') this.appliedLogic = true;
  //   }
  //   this.appliedLogic = false;
  // }

  // isDisabled() {
  //   console.log(this.appliedLogic);
  //   if (this.appliedLogic)
  //     return {
  //       'background-color': 'grey',
  //       color: 'white',
  //     };
  //   return;
  // }
}
