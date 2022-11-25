import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private readonly API_PATH = `http://localhost:8080/api/offer`;

  constructor(private http: HttpClient) {}

  getCreditCardOffer(bankAccId: number | null | undefined) {
    return this.http.get(this.API_PATH + `/credit-card/${bankAccId}`);
  }
}
