import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { defaultSelectOptionValidator } from '../customer-form/validators/defaultSelectOptionValidator';
const Big = require('big.js');

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {
  @Input() sentInBankAcc: BankAccount = new BankAccount();

  bankAcc?: BankAccount = new BankAccount();
  customer?: Customer = new Customer();

  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bankAccService: BankAccountService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // console.log(this.sentInBankAcc)
    this.customerForm.setValue({
      firstName: this.sentInBankAcc.customer!.custFirstName,
      lastName: this.sentInBankAcc.customer!.custLastName,
      email: this.sentInBankAcc.customer!.custEmail,
      phone: this.sentInBankAcc.customer!.custPhone,
      city: this.sentInBankAcc.customer!.custCity,
      accType: this.sentInBankAcc.accType,
      accBal: this.transformAccBall(this.sentInBankAcc.accBal),
    });
  }

  transformAccBall(accBal: string | null | undefined) {
    accBal = accBal!.slice(1);
    accBal = accBal!.replace(',', '');
    if (accBal) {
      return accBal;
    }
    return '';
  }

  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
    accType: ['', defaultSelectOptionValidator()],
    accBal: ['', Validators.required],
  });

  get firstName() {
    return this.customerForm.get('firstName');
  }

  get lastName() {
    return this.customerForm.get('lastName');
  }

  get email() {
    return this.customerForm.get('email');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  get city() {
    return this.customerForm.get('city');
  }

  get accType() {
    return this.customerForm.get('accType');
  }

  get accBal() {
    return this.customerForm.get('accBal');
  }

  isInvalid(controlName: string) {
    let formControl = this.customerForm.get(controlName);
    return {
      'is-invalid':
        this.isSubmitted &&
        (formControl?.hasError('required') ||
          formControl?.hasError('defaultSelectOptionValidator')),
    };
  }

  onSubmit() {
    this.isSubmitted = true;
    const formData = this.customerForm.getRawValue();

    this.customer!.custId = this.sentInBankAcc.customer!.custId;
    this.customer!.custEmail = formData.email;
    this.customer!.custFirstName = formData.firstName;
    this.customer!.custLastName = formData.lastName;
    this.customer!.custPhone = formData.phone;
    this.customer!.custCity = formData.city;
    this.customer!.offers = this.sentInBankAcc.customer!.offers;

    this.bankAcc!.accId = this.sentInBankAcc.accId;

    this.bankAcc!.accBal = formData.accBal;

    this.bankAcc!.accType = formData.accType;
    this.bankAcc!.accCreationDate = this.sentInBankAcc.accCreationDate;
    this.bankAcc!.customer = this.customer;

    if (this.customerForm.valid) {
      this.bankAccService.updateBankAcc(this.bankAcc).subscribe({
        next: (res: any) => {
          console.log(res);
          this.activeModal.close();
          this.customerForm.reset();
          this.accType!.setValue('--Select Option--');
        },
        error: (err: HttpErrorResponse) => {
          if (err) {
            alert('Something went wrong, please try again.');
            console.log(err.message);
          }
        },
      });
    }
  }
}
