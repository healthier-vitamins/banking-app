import { Offer } from './offer';

export class Customer {
  constructor(
    public custId?: number | null,
    public custFirstName?: string | null,
    public custLastName?: string | null,
    public custCity?: string | null,
    public custPhone?: string | null,
    public custEmail?: string | null,
    public offers?: Offer[]
  ) {}
}
