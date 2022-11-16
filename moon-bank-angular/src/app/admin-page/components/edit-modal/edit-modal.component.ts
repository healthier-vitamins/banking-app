import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { defaultSelectOptionValidator } from '../customer-form/validators/defaultSelectOptionValidator';

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
    private router: Router,
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
      accBal: this.sentInBankAcc.accBal,
    });
  }

  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
    accType: ['', defaultSelectOptionValidator()],
    accBal: [0, Validators.required],
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

    this.customer!.custEmail = formData.email;
    this.customer!.custFirstName = formData.firstName;
    this.customer!.custLastName = formData.lastName;
    this.customer!.custPhone = formData.phone;
    this.customer!.custCity = formData.city;
    this.bankAcc!.accBal = formData.accBal;
    this.bankAcc!.accType = formData.accType;
    this.bankAcc!.customer = this.customer;

    if (this.customerForm.valid) {
      this.bankAccService.saveBankAccount(this.bankAcc).subscribe({
        next: (res: any) => {
          console.log(res);
          this.customerForm.reset();
          this.accType!.setValue('--Select Option--');
          this.router.navigate(['admin/all-customer']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 406) {
            alert('Username is taken, please try again');
          }
        },
      });
    }
  }

}
