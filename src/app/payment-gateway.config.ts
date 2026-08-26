import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface PaymentGatewayConfig {
  apiUrl: string;
  defaultCurrency: string;
  maxTransactionLimit: number;
}

export const PAYMENT_GATEWAY_CONFIG = new InjectionToken<PaymentGatewayConfig>(
  'PAYMENT_GATEWAY_CONFIG',
);

export function providePaymentGateway(config: PaymentGatewayConfig) {
  return makeEnvironmentProviders([{ provide: PAYMENT_GATEWAY_CONFIG, useValue: config }]);
}
