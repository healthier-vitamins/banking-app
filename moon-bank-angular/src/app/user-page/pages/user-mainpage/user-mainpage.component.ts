import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BankAccount } from 'src/app/models/bank-account';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-mainpage',
  templateUrl: './user-mainpage.component.html',
  styleUrls: ['./user-mainpage.component.css'],
})
export class UserMainpageComponent implements OnInit {
  bankAcc!: BankAccount;
  user!: User;

  constructor(
    private cookieService: CookieService,
    private bankAccService: BankAccountService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserAcc();
    this.getBankAcc();
  }

  getUserAcc() {
    this.userService.getUser(this.cookieService.get('username')).subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res as User;
        this.cookieService.set(
          'id',
          res.bankAccId,
          this.authService.getExpiredDate(),
          '/',
          'localhost'
        );
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Username not found');
        }
      },
    });
  }

  getBankAcc() {
    const accId: number = parseInt(this.cookieService.get('id'));
    this.bankAccService.getAccById(accId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.bankAcc = res as BankAccount;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          alert('Bank account id not found');
        }
      },
    });
  }
}
