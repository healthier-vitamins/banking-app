import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  private readonly API_PATH = `http://localhost:8080/api/bank-acc`;

  constructor(private http: HttpClient) {}

  getAllBankAccount() {
    return this.http.get(this.API_PATH + `/get-all`);
  }
}
