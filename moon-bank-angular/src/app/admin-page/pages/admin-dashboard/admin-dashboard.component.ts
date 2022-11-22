import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  bankAccCount?: number;
  avgAccs?: number;

  constructor(private bankAccService: BankAccountService) {}

  ngOnInit(): void {
    this.getBankAccCount();
    this.getAvgAccs();
  }

  getBankAccCount() {
    this.bankAccService.getBankAccCount().subscribe({
      next: (res) => {
        this.bankAccCount = res as number;
      },
    });
  }

  getAvgAccs() {
    this.bankAccService.getAvgAccsCreated().subscribe({
      next: (res) => {
        this.avgAccs = res as number;
      },
    });
  }
}
