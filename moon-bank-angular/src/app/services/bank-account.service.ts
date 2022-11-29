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
    return this.http.post(
      this.API_PATH + `/save-acc`,
      JSON.stringify(bankAcc),
      { headers: this.reqHeader }
    );
  }

  updateBankAcc(bankAcc: BankAccount | null | undefined) {
    return this.http.put(
      this.API_PATH + `/update-acc`,
      JSON.stringify(bankAcc),
      { headers: this.reqHeader }
    );
  }

  delBankAcc(bankAccId: number | null | undefined) {
    return this.http.delete(this.API_PATH + `/del-acc/${bankAccId}`);
  }

  getBankAccCount() {
    return this.http.get(this.API_PATH + `/count`);
  }

  getAvgAccsCreated() {
    return this.http.get(this.API_PATH + '/accs-created-over-lifetime');
  }

  getAccById(bankAccId: number | null | undefined) {
    return this.http.get(this.API_PATH + `/get-acc/${bankAccId}`);
  }
}
