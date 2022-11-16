import { Customer } from './customer';

export class BankAccount {
  constructor(
    public accId?: number | null,
    public accType: string | null = '--Select Option--',
    public accBal: number | null = 0,
    public accCreationDate?: string | null,
    public customer?: Customer | null
  ) {}
}
