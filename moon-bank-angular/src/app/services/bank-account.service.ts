import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../models/bank-account';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  private readonly API_PATH = `http://localhost:8080/api/bank-acc`;

  constructor(private http: HttpClient) {}

  getAllBankAccount() {
    return this.http.get(this.API_PATH + `/get-all`);
  }

  saveBankAccount(bankAcc: BankAccount | null | undefined) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      this.API_PATH + `/save-user`,
      JSON.stringify(bankAcc),
      { headers: reqHeader }
    );
  }
}
