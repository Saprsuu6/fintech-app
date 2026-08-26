export interface BankCard {
  id: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  isBlocked: boolean;
  balance: number;
}

export interface Transaction {
  id: string;
  cardNumber: string;
  amount: number;
  description: string;
  date: string;
  type: 'credit' | 'debit';
}

export interface PaymentResult {
  success: boolean;
  errorMessage?: string;
  transactionId?: string;
}
