import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private readonly API_PATH = `http://localhost:8080/api/offer`;

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getCreditCardOffer(bankAccId: number | null | undefined) {
    return this.http.get(this.API_PATH + `/credit-card/${bankAccId}`);
  }

  getCustId(bankAccId: number | null | undefined) {
    return this.http.get(this.API_PATH + `/get-custid/${bankAccId}`);
  }

  applyCreditCardOffer(offer: Offer | null | undefined) {
    return this.http.post(this.API_PATH + `/save`, JSON.stringify(offer), {
      headers: this.reqHeader,
    });
  }
}
