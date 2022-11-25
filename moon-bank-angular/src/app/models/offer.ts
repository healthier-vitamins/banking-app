export class Offer {
  constructor(
    public offerId?: number | null,
    public offerName?: string | null,
    public loanAmnt?: string | null,
    public interestRatePercent?: string | null,
    public interestFreeCashWithdrawal?: string | null,
    public annualFee?: string | null,
    public preclosureCharges?: string | null
  ) {}
}
