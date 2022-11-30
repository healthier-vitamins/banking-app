import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';

import { BankAccount } from 'src/app/models/bank-account';
import { Customer } from 'src/app/models/customer';
import { Offer } from 'src/app/models/offer';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-show-all-customer',
  templateUrl: './show-all-customer.component.html',
  styleUrls: ['./show-all-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ShowAllCustomerComponent implements OnInit {
  listOfBankAcc!: BankAccount[];
  listOfOffers?: Offer[];
  // customer: Customer = new Customer();

  expandedColumns = [
    'Name',
    'Annual Fee',
    'Loan Amount',
    'Interest Free Withdrawal',
    'Interest Rate',
    'Pre-Closure Charges'
  ]
  // dataSource = this.listOfBankAcc;
  columnsToDisplay = [
    '#',
    'email',
    'firstName',
    'lastName',
    'phone',
    'city',
    'accBal',
    'accType',
    'dateCreated',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: BankAccount | null;

  constructor(
    private bankAccService: BankAccountService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.loadingBalls();
    this.getBankAccounts();
  }

  getBankAccounts() {
    this.bankAccService.getAllBankAccount().subscribe({
      next: (res: any) => {
        this.listOfBankAcc = res as BankAccount[];
        console.log(this.listOfBankAcc);
        // this.dataSource = this.listOfBankAcc;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 204) {
          alert('Database is empty');
        }
      },
    });
  }

  edit(element: BankAccount) {
    const modalRef = this.modalService.open(EditModalComponent, { size: 'xl' });
    modalRef.componentInstance.sentInBankAcc = element;

    modalRef.result.finally(() => {
      this.getBankAccounts();
    });
  }

  delBankAcc(element: BankAccount) {
    this.bankAccService
      .delBankAcc(element.accId)
      .pipe(
        finalize(() => {
          this.getBankAccounts();
        })
      )
      .subscribe({
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            alert('Invalid bank account.');
          }
        },
      });
  }

  refresh() {
    this.listOfBankAcc = [];
    this.getBankAccounts();
  }

  expandedHelper(element: BankAccount) {
    this.listOfOffers = element.customer?.offers;
    
  }

  // loadingBalls() {
  //   setTimeout(() => {
  //     document.getElementById(`loading-ball${this.counter}`)!.style.display =
  //       'block';
  //     this.counter++;
  //     if (this.counter <= 4) {
  //       this.loadingBalls();
  //     }
  //   }, 160);
  // }
}
