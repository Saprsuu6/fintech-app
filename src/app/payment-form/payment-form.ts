import { Component, inject, signal } from '@angular/core';
import { PaymentResult } from '../models';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentFormComponent {
  private readonly paymentService = inject(PaymentService);

  readonly amount = signal(0);
  readonly recipientPan = signal('');
  readonly paymentResult = signal<PaymentResult | null>(null);

  onAmountInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.amount.set(value);
  }

  onRecipientInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.recipientPan.set(value);
  }

  onSubmit(): void {
    const result = this.paymentService.processPayment(this.amount(), this.recipientPan());
    this.paymentResult.set(result);
  }
}
