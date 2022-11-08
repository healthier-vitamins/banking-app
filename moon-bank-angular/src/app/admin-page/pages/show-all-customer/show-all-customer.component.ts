import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-show-all-customer',
  templateUrl: './show-all-customer.component.html',
  styleUrls: ['./show-all-customer.component.css'],
})
export class ShowAllCustomerComponent implements OnInit {
  bankAcc?: BankAccount[];
  customer?: Customer;

  constructor(private bankAccService: BankAccountService) {}

  ngOnInit(): void {
    this.getBankAccounts();
  }

  getBankAccounts() {
    this.bankAccService.getAllBankAccount().subscribe({
      next: (res: any) => {
        this.bankAcc = res as BankAccount[];
        console.log(this.bankAcc);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 204) {
          alert('Database is empty');
        }
      },
    });
  }
}
