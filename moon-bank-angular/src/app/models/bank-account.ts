import { CurrencyPipe } from '@angular/common';
import { Customer } from './customer';

export class BankAccount {
  constructor(
    public accId?: number | null,
    public accType: string | null = '--Select Option--',
    public accBal: string | null = '0', 
    public accCreationDate?: string | null,
    public customer?: Customer | null
  ) {}
}
