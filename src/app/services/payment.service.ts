import { inject, Injectable } from '@angular/core';
import { PaymentResult } from '../models';
import { PAYMENT_GATEWAY_CONFIG } from '../payment-gateway.config';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly config = inject(PAYMENT_GATEWAY_CONFIG);

  processPayment(amount: number, recipientPan: string): PaymentResult {
    if (amount <= 0) {
      return {
        success: false,
        errorMessage: 'Сумма должна быть больше нуля',
      };
    }

    if (amount > this.config.maxTransactionLimit) {
      return {
        success: false,
        errorMessage: `Сумма превышает лимит ${this.config.maxTransactionLimit} ${this.config.defaultCurrency}`,
      };
    }

    if (!recipientPan || recipientPan.length < 16) {
      return {
        success: false,
        errorMessage: 'Некорректный номер карты получателя',
      };
    }

    return {
      success: true,
      transactionId: crypto.randomUUID(),
    };
  }
}
