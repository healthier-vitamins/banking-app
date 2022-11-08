import { Customer } from "./customer";

export interface BankAccount {
    accId: number;
    accType: string;
    accBal: number;
    accCreationDate: string;
    customer: Customer;
}
