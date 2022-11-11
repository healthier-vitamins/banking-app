import { Customer } from './customer';

export class BankAccount {
  constructor(
    public accId?: number | null,
    public accType?: string | null,
    public accBal?: number | null,
    public accCreationDate?: string | null,
    public customer?: Customer | null
  ) {}
}
