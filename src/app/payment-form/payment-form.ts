import { Component, inject, signal } from '@angular/core';
import { PaymentResult } from '../models';
import { CardsService } from '../services/cards.service';
import { PaymentService } from '../services/payment.service';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentFormComponent {
  private readonly paymentService = inject(PaymentService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly cardsService = inject(CardsService);

  readonly amount = signal(0);
  readonly recipientPan = signal('');
  readonly transactionType = signal<'credit' | 'debit'>('debit');
  readonly paymentResult = signal<PaymentResult | null>(null);

  onAmountInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.amount.set(value);
  }

  onRecipientInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.recipientPan.set(value);
  }

  onTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as 'credit' | 'debit';
    this.transactionType.set(value);
  }

  onSubmit(): void {
    const result = this.paymentService.processPayment(this.amount(), this.recipientPan());

    if (result.success && result.transactionId) {
      const pan = this.recipientPan() || '0000 0000 0000 0000';
      this.transactionsService.addTransaction({
        id: result.transactionId,
        cardNumber: pan,
        amount: this.amount(),
        description: 'Новый платеж из формы',
        date: new Date().toISOString().split('T')[0],
        type: this.transactionType(),
      });

      this.cardsService.updateBalance(pan, this.amount(), this.transactionType());
    }

    this.paymentResult.set(result);
  }
}
