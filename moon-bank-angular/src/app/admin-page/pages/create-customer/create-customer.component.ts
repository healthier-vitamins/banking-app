import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';

import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  bankAcc?: BankAccount = new BankAccount();
  customer?: Customer = new Customer();

  constructor(
    private formBuilder: FormBuilder,
    private bankAccService: BankAccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  customerForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    city: [''],
    accType: ['--Select Option--'],
    accBal: [''],
  });

  onSubmit() {
    const formData = this.customerForm.getRawValue();
    // console.log(formData);

    this.customer!.custEmail = formData.email;
    this.customer!.custFirstName = formData.firstName;
    this.customer!.custLastName = formData.lastName;
    this.customer!.custPhone = formData.phone;
    this.customer!.custCity = formData.city;
    // this.customer!.offers = [];
    this.bankAcc!.accBal = parseFloat(formData.accBal ? formData.accBal : '0');
    this.bankAcc!.accType = formData.accType;
    this.bankAcc!.customer = this.customer;

    console.log(this.bankAcc);

    this.bankAccService.saveBankAccount(this.bankAcc).subscribe({
      next: (res) => {
        console.log(res);
        this.customerForm.reset();
        this.router.navigate(['admin/all-customer']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
