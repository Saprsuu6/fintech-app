import { createActionGroup, props } from '@ngrx/store';

export const PaymentActions = createActionGroup({
  source: 'Payment',
  events: {
    'Make Payment': props<{ amount: number; pan: string; txType: 'credit' | 'debit' }>(),
    'Payment Success': props<{ id: string }>(),
    'Payment Blocked': props<{ reason: string }>(),
  },
});
