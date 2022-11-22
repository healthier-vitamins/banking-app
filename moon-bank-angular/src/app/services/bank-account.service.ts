import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../models/bank-account';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  private readonly API_PATH = `http://localhost:8080/api/bank-acc`;
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getAllBankAccount() {
    return this.http.get(this.API_PATH + `/get-all`);
  }

  saveBankAccount(bankAcc: BankAccount | null | undefined) {
    // const reqHeader = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    return this.http.post(
      this.API_PATH + `/save-user`,
      JSON.stringify(bankAcc),
      { headers: this.reqHeader }
    );
  }

  updateBankAcc(bankAcc: BankAccount | null | undefined) {
    return this.http.put(
      this.API_PATH + `/update-bank-acc`,
      JSON.stringify(bankAcc),
      { headers: this.reqHeader }
    );
  }

  delBankAcc(bankAccId: number | null | undefined) {
    return this.http.delete(this.API_PATH + `/del-bank-acc/${bankAccId}`);
  }

  getBankAccCount() {
    return this.http.get(this.API_PATH + `/bank-acc-count`);
  }

  getAvgAccsCreated() {
    return this.http.get(this.API_PATH + '/accs-created-over-lifetime');
  }
}
